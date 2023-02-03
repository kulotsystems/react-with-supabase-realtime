import { Button, HStack, Input } from '@chakra-ui/react';

const AddTask = () => {

    return (
        <HStack my="4" h="45">
            <Input h="100%" variant="filled" placeholder="Do the laundry" />
            <Button colorScheme="blue" px="10" h="100%" type="submit">
                Add
            </Button>
        </HStack>
    );
};

export default AddTask;
