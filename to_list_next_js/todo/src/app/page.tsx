
"use client"
import { DeleteIcon, EditIcon, MoonIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, UnorderedList, useColorMode, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [task, setTask] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [update, setUpdate] = useState()
  const [starColor, setStarColor] = useState<{ [key: number]: boolean }>({});

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleCreateTask = async (event: any) => {
    event.preventDefault();
    
    try {
      const res  = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({task}),
      });

      console.log("res: ", res)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "erro ao cadastrar")
      }

    
      setTask("");
      onClose();
      alert("cadastrado com sucesso!")
    } catch(error){
      console.log("error handleSubmit: ", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getTask", {
          method: "GET",
          })

          if(!res.ok){
            throw new Error("erro ao buscar tarefas")
          }

          // converte em json
          const dataResponse = await res.json()

          console.log("data: ", dataResponse)

          setData(dataResponse)
        

      } catch(error){
        console.error("erro inesperado")
      }
    }  

    fetchData()
  },[task])


  const handleDelete = async (id: number) => {
    try{
      const deleteRes = await fetch("/api/deleteTask", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id }) // busa o id 
      })

      if (!deleteRes.ok) {
        throw new Error("Erro ao deletar a tarefa");
      }
  
      // Atualiza a lista de tarefas após deletar
      const dataDelete = await deleteRes.json();
      setData(data.filter((x) => x.id !== id));
      console.log(dataDelete.message); // Exibe a mensagem de sucesso
    }catch(error){
      console.error("erro delete")
    }
  } 


  
  const fetchData = async () => {
    try {
      const res = await fetch("/api/getTask", {
        method: "GET",
        })

        if(!res.ok){
          throw new Error("erro ao buscar tarefas")
        }

        // converte em json
        const dataResponse = await res.json()

        console.log("data: ", dataResponse)

        setData(dataResponse)

    } catch(error){
      console.error("erro inesperado")
    }
  }  

useEffect(() => {
fetchData()
}, [])

const handleStarColor = (id: number) => {
  setStarColor((prev) =>({
    ...prev,
    [id]: !prev[id] // alterna a cor da estrela
  }))
}

const handleClickFavoritos = () => {
  
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
                onClick={handleClickFavoritos}
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
                  <UnorderedList width={"100%"} textDecoration={"none"}>
                  {data.map((item: any) => (
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
                      key={item.id}
                    >
                   <List listStyleType={"none"}>
                        <ListItem >
                          {item.task}
                        </ListItem>
                        </List>
                      <Flex>
                        <Button
                          variant={"unstyled"}
                          onClick={() => handleStarColor(item.id)}
                        >
                          <StarIcon color={starColor[item.id] ? "green" : "gray"} />
                        </Button>
                        <Button
                          variant={"unstyled"}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteIcon color={"red"} />
                        </Button>
                      </Flex>
                    </Flex>
                     ))}
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
          <form onSubmit={handleCreateTask}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tarefas</FormLabel>
              <Input onChange={(e: any) => setTask(e.target.value)} value={task} ref={initialRef} placeholder='digite sua tarefa' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' type={"submit"} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
