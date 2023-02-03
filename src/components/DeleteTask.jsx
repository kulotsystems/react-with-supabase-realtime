import { IconButton } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import supabase from '../supabase.js';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const DeleteTask = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleDelete = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id)
        setLoading(false);

        toast({
            title: error?.message || 'Task deleted!',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true
        });
    };

    return (
        <IconButton
            isRound="true" icon={<FiTrash2/>}
            aria-label="Delete"
            isLoading={loading}
            onClick={handleDelete}
        />
    );
};

export default DeleteTask;
