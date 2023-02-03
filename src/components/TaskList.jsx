import { Box, HStack, Image, StackDivider, Text, VStack } from '@chakra-ui/react';
import ClearTasks from './ClearTasks.jsx';
import DeleteTask from './DeleteTask.jsx';
import img from '../assets/empty.svg';

const TaskList = () => {
    // If there are no tasks, show placeholder image
    return (
        <Box align="center">
            <Image src={img} mt="30px" maxW="95%"/>
        </Box>
    );

    return (
        <>
            <VStack
                divider={<StackDivider/>}
                borderColor="gray.100"
                borderWidth="2px"
                p="5"
                borderRadius="lg"
                w="100%"
                maxW={{ base: '90vw', sm: '80vw', lg: '500vw', xl: '30vw'}}
                alignItems="stretch"
            >
                {/*<HStack key="">*/}
                {/*    <Text w="100%" p="8px" borderRadius="lg">*/}
                {/*        Wash the dishes*/}
                {/*    </Text>*/}
                {/*    <DeleteTask/>*/}
                {/*</HStack>*/}
            </VStack>

            <ClearTasks/>
        </>
    );
};

export default TaskList;
