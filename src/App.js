import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Flex,
  Spacer,
  HStack,
  VStack,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import FlashcardMode from "./components/modes/FlashcardMode";
import QuizMode from "./components/modes/QuizMode";
import ReviewMode from "./components/modes/ReviewMode";
import flashcardsData from "./data/terms.json";

// Main App component
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const categories = [...new Set(flashcardsData.map((card) => card.category))];

  // State for bookmarked cards
  const [bookmarkedCards, setBookmarkedCards] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedCards");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Function to toggle bookmarks
  const toggleBookmark = (card) => {
    let updatedBookmarks;
    if (bookmarkedCards.some((c) => c.term === card.term)) {
      updatedBookmarks = bookmarkedCards.filter((c) => c.term !== card.term);
    } else {
      updatedBookmarks = [...bookmarkedCards, card];
    }
    setBookmarkedCards(updatedBookmarks);
    localStorage.setItem("bookmarkedCards", JSON.stringify(updatedBookmarks));
  };

  return (
    <Box>
      <Flex
        as="nav"
        bg={useColorModeValue("teal.500", "gray.900")}
        p="2"
        boxShadow="lg"
        alignItems="center"
        position="sticky"
        top="0"
        zIndex="10"
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        height="70px"
      >
        <HStack spacing="4">
          <Box boxSize={{ base: "70px", md: "40px" }} mt="2">
            <img
              src="/medical-term/images/book-cover.jpg"
              alt="Book Cover"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <VStack align="center" spacing="0">
            <Heading
              size={{ base: "sm", md: "md" }}
              color="white"
              textAlign="center"
            >
              Medical Terminology for Health Professions 9th Edition
            </Heading>
          </VStack>
        </HStack>
        <Spacer />
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          isRound
          size="sm"
          colorScheme="teal"
          aria-label="Toggle dark mode"
        />
      </Flex>
      {/* Tabs for different modes */}
      <Tabs variant="enclosed" colorScheme="teal" mt="4">
        <TabList>
          <Tab>Flashcards</Tab>
          <Tab>Quiz</Tab>
          <Tab>Review</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FlashcardMode
              flashcardsData={flashcardsData}
              categories={categories}
              bookmarkedCards={bookmarkedCards}
              toggleBookmark={toggleBookmark}
            />
          </TabPanel>
          <TabPanel>
            <QuizMode flashcardsData={flashcardsData} categories={categories} />
          </TabPanel>
          <TabPanel>
            <ReviewMode
              flashcardsData={flashcardsData}
              categories={categories}
              bookmarkedCards={bookmarkedCards}
              toggleBookmark={toggleBookmark}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
