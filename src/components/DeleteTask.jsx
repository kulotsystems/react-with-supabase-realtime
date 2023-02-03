import { IconButton } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteTask = () => {
    return (
        <IconButton isRound="true" icon={<FiTrash2/>} aria-label="Delete"/>
    );
};

export default DeleteTask;
