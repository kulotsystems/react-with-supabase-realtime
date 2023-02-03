import { useState } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import supabase from '../supabase.js';
import { useToast } from '@chakra-ui/react';

const ClearTasks = () => {
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handleClear = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .not('id', 'eq', -1);
        setLoading(false);

        toast({
            title: error?.message || 'Tasks cleared!',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true
        });
    };

    return (
        <Flex>
            <Button
                colorScheme="gray" px="8" h="45" color="gray.500" mt="10"
                onClick={handleClear}
                isLoading={loading}
                loadingText="Clearing Tasks"
            >
                Clear Tasks
            </Button>
        </Flex>
    );
};

export default ClearTasks;
