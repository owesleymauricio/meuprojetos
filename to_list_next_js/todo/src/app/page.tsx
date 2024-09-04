
"use client"
import { DeleteIcon, EditIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, UnorderedList, useColorMode, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [task, setTask] = useState<string>("")

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data ={
      task,
    }

    console.log("data: ", data)
  }
  
  return (
    <>
    <Flex
    justifyContent={"space-between"}
    alignItems={"center"}
    textAlign={"center"}
    p={"10px"}
    mr={"30px"}
    ml={"30px"}
    >
      <Heading>Todolist</Heading>
      <Button
      variant={"unstyled"}
      onClick={toggleColorMode}
      fontSize={"50px"}
      >
         {colorMode === "light" ? <MoonIcon /> : <SunIcon color={"yellow"}/>}
      </Button>
    </Flex>
      <Flex w={"100vw"} h={"100vh"} maxW={"1600px"} margin={"0 auto"}>
        <Flex
         m={"15px"} 
         justifyContent={"center"} 
         alignItems={"center"} 
         w={"100%"}
         >
          {/* buttons options */}
          <Flex
            height={"80%"}
            border={"1px solid gray"}
            borderRadius={"8px"}
            padding={"10px"}
            w={"500px"}
            justifyContent={"center"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              
              width={"100%"}
            >
              <Button
                m={"5px"}
                height={"60px"}
                fontFamily={"sans-serif"}
                fontSize={"30px"}
                colorScheme="purple"
                onClick={onOpen}
              >
                Casdatrar
              </Button>
              <Button
                m={"5px"}
                height={"60px"}
                fontFamily={"sans-serif"}
                fontSize={"30px"}
                colorScheme="purple"
              >
                Cadastados
              </Button>
              <Button
                m={"5px"}
                height={"60px"}
                fontFamily={"sans-serif"}
                fontSize={"30px"}
                colorScheme="purple"
              >
                Favoritos
              </Button>
              <Button
                m={"5px"}
                height={"60px"}
                fontFamily={"sans-serif"}
                fontSize={"30px"}
                colorScheme="purple"
              >
                Concluido
              </Button>
            </Box>
          </Flex >
          <Flex w={"100%"} height={"100%"} mt={"12%"} flexDirection={"column"}>
            <Flex  >
              <Stack w={"90%"} justifyContent={"center"}  >
                <Box w={"100%"} gap={2} top={"10%"} maxW={"1200px"}>
                  <UnorderedList width={"100%"} >
                    <Flex
                      justifyContent={"space-between"}
                      m={"5px"}
                      boxShadow={"sm"}
                      fontSize={"20px"}
                      fontFamily={"monospace"}
                      border={"1px solid gray"}
                      borderRadius={"8px"}
                      p={"8px"}
                      w={"100%"}
                    >
                      <ListItem>
                        Lorem ipsum dolor sit amet
                      </ListItem>
                      <Flex>
                        <Button
                          variant={"unstyled"}
                        >
                          <EditIcon color={"green"} />
                        </Button>
                        <Button
                          variant={"unstyled"}
                        >
                          <DeleteIcon color={"red"} />
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      m={"5px"}
                      boxShadow={"sm"}
                      fontSize={"20px"}
                      fontFamily={"monospace"}
                      border={"1px solid gray"}
                      borderRadius={"8px"}
                      p={"8px"}
                      w={"100%"}
                    >
                      <ListItem>
                        Consectetur adipiscing elit
                      </ListItem>
                      <Flex>
                        <Button
                          variant={"unstyled"}
                        >
                          <EditIcon color={"green"} />
                        </Button>
                        <Button
                          variant={"unstyled"}
                        >
                          <DeleteIcon color={"red"} />
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      m={"5px"}
                      boxShadow={"sm"}
                      fontSize={"20px"}
                      fontFamily={"monospace"}
                      border={"1px solid gray"}
                      borderRadius={"8px"}
                      p={"8px"}
                      w={"100%"}
                    >
                      <ListItem>
                        Integer molestie lorem at massa
                      </ListItem>
                      <Flex>
                        <Button
                          variant={"unstyled"}
                        >
                          <EditIcon color={"green"} />
                        </Button>
                        <Button
                          variant={"unstyled"}
                        >
                          <DeleteIcon color={"red"} />
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      m={"5px"}
                      boxShadow={"sm"}
                      fontSize={"20px"}
                      fontFamily={"monospace"}
                      border={"1px solid gray"}
                      borderRadius={"8px"}
                      p={"8px"}
                      w={"100%"}>
                      <ListItem>
                        Facilisis in pretium nisl aliquet
                      </ListItem>
                      <Flex>
                        <Button
                          variant={"unstyled"}
                        >
                          <EditIcon color={"green"} />
                        </Button>
                        <Button
                          variant={"unstyled"}
                        >
                          <DeleteIcon color={"red"} />
                        </Button>
                      </Flex>
                    </Flex>
                  </UnorderedList>
                </Box>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* modal here */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tarefas</FormLabel>
              <Input onChange={(e: any) => setTask(e.target.value)} value={task} ref={initialRef} placeholder='digite sua tarefa' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' onClick={handleSubmit} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
