import { useEffect, useState } from 'react';
import { Box, HStack, Image, StackDivider, Text, VStack } from '@chakra-ui/react';
import ClearTasks from './ClearTasks.jsx';
import DeleteTask from './DeleteTask.jsx';
import img from '../assets/empty.svg';
import supabase from '../supabase.js';
import _ from 'lodash';

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


    // subscribe to events
    const todos = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'todos' },
            (payload) => {
                switch (payload.eventType) {
                    case 'INSERT':
                        setTasks(tasks.concat(payload.new))
                        break;
                    case 'UPDATE':
                        const updatedTasks = _.cloneDeep(tasks);
                        updatedTasks.map(task => {
                            if(task.id === payload.old.id)
                                task = payload.new;
                            return task;
                        });
                        setTasks(updatedTasks);
                        break;
                    case 'DELETE':
                        const remainingTasks = tasks.filter(task => task.id !== payload.old.id);
                        setTasks(remainingTasks);
                        break;
                    default:
                        console.log('Unhandled event: ', payload.eventType);
                }
            }
        ).subscribe();


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
                        <DeleteTask id={task.id}/>
                    </HStack>
                ))}
            </VStack>

            <ClearTasks/>
        </>
    );
};

export default TaskList;
