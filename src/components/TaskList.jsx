import { useEffect, useState } from 'react';
import { Box, HStack, Image, StackDivider, Text, VStack } from '@chakra-ui/react';
import ClearTasks from './ClearTasks.jsx';
import DeleteTask from './DeleteTask.jsx';
import img from '../assets/empty.svg';
import supabase from '../supabase.js';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // onload
    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            let { data: tasks, error } = await supabase
                .from('todos')
                .select('*');

            if(error) {

            }

            if(tasks) {
                setTasks(tasks);
            }
        };

        fetchData().then(response => {});
    }, []);


    // If there are no tasks, show placeholder image
    if(tasks.length <= 0) {
        return (
            <Box align="center">
                <Image src={ img } mt="30px" maxW="95%"/>
            </Box>
        );
    }

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
                {tasks.map(task => (
                    <HStack key={task.id}>
                        <Text w="100%" p="8px" borderRadius="lg">
                            {task.text}
                        </Text>
                        <DeleteTask/>
                    </HStack>
                ))}
            </VStack>

            <ClearTasks/>
        </>
    );
};

export default TaskList;
