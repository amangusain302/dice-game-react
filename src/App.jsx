import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from "@chakra-ui/react";
import { useState } from "react";
import { color } from "framer-motion";

function App() {

  const diceArray = [1,2,3,4,5,6];
  
  const [gameStarted, setGameStarted] = useState(false);

  const [SelectNumber , setSelectNumber] = useState();
  const [randomNumber, setRandomNumber] = useState(1);
  const [getScore , setScore] = useState(0);
  const [errorMessage , setErrorMessage] = useState(false)

  const genRandomNumber = () => {
    if(SelectNumber)
    {
    const random = Math.ceil(Math.random() * 6);
    setRandomNumber(random);
    if(randomNumber === SelectNumber)
    {
      setScore((prev) => prev + randomNumber);
    }
    else
    {
      setScore((prev) => prev - 2)
    }
    }
    else
    {
      setErrorMessage(true)
    }
  }

  const gameStartHandler = () => {
    setGameStarted(true);
  };

  const onNumberClicked = (value) => {
    setSelectNumber(value)
    setErrorMessage(false)
  }

  const resetGame = () => {
    setScore(0);
    setSelectNumber();
    setErrorMessage(false)
  }
  return (
    <>
      {gameStarted ? (
        <>
        <Stack justifyContent='center' alignItems='center' maxW='1000px' mx='auto' mt={3}>
          <Heading fontSize='6xl' mb={1} color={errorMessage ? "red" : "black"} >{(errorMessage) ? 'Please Select Number' : 'Select Number'}</Heading>
          <Flex pb={2}>
          {diceArray.map((diceNumber, index) => (
          <Flex
            bg={ (SelectNumber === diceNumber)? 'green.500' : 'black'}
            m={6}
            h="40px"
            w="40px"
            justify='center'
            cursor='pointer'
            alignItems='center'
            color="white"
            fontSize='2xl'
            borderRadius='5px' 
            key={index}
            onClick={() => onNumberClicked(diceNumber)}
          >

            {diceNumber}
          </Flex>
          ))}
          </Flex>
          <Box m={1} cursor="pointer" onClick={genRandomNumber}><Image src={`/dice/dice${randomNumber}.png`}/></Box>
          <Text fontSize='3xl'>Click on dice to roll</Text>
          <Text color={ getScore>=0 ? "green.500" : "red"}  fontSize='8xl' fontWeight="bold" >{getScore}</Text>
          <Text  fontSize='6xl' fontWeight="bold" >Total Score</Text>
          <Button onClick={resetGame}>Reset Score</Button>
        </Stack>
        <Stack maxW='1000px' mx='auto'>
        <Heading>Game Rules :-</Heading>
        <UnorderedList>
          <ListItem >Select Number any number</ListItem>
          <ListItem>Click on dice Image to roll it</ListItem>
          <ListItem>Select number is equal to obtained dice result then you will get same point of dice</ListItem>
          <ListItem>if you are wrong score will be deducted by 2 points</ListItem>
        </UnorderedList>
        </Stack>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" >
          <Image width="50%" m="3%" src="/dices.png" />
          <Stack>
            <Text fontSize="7xl" as="b">
              The Dice Game
            </Text>
            <Button
              bg="black"
              alignSelf="flex-end"
              color="white"
              _hover={{ bg: "grey" }}
              onClick={gameStartHandler}
            >
              Start Game
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  );
}

export default App;
