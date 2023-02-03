import { useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
import supabase from '../supabase.js';
import { useToast } from '@chakra-ui/react';

const AddTask = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handleAdd = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('todos')
            .insert({ text: text })
            .select();
        setLoading(false);

        toast({
            title: error?.message || 'Task added!',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true
        });
        setText('');
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
            <Button colorScheme="blue" px="10" h="100%" type="submit" onClick={handleAdd} isLoading={loading} loadingText="Adding">
                Add
            </Button>
        </HStack>
    );
};

export default AddTask;
