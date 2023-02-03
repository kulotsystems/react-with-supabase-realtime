import { useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
import supabase from '../supabase.js';

const AddTask = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('todos')
            .insert({ text: text })
            .select();
        setLoading(false);

        if(error) {
            console.log(error.message);
        }

        if(data) {
            setText('');
        }
    };

    return (
        <HStack my="4" h="45">
            <Input
                h="100%"
                variant="filled"
                placeholder="Do the laundry"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <Button colorScheme="blue" px="10" h="100%" type="submit" onClick={handleAdd} isLoading={loading}>
                Add
            </Button>
        </HStack>
    );
};

export default AddTask;
