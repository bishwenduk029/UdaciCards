import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = "NOTIFICATION_KEY";

export async function getDecks() {
  try {
    let response = await AsyncStorage.getItem("decks");
    let decks = (await JSON.parse(response)) || {};
    return decks;
  } catch (error) {
    console.log(error);
  }
}

export async function getDeck(deckID) {
  try {
    let decks = await getDecks();
    return decks[deckID];
  } catch (error) {
    console.log(error);
  }
}

export async function saveNewDeckToNative(newDeckTitle) {
  try {
    let decks = await getDecks();
    decks[newDeckTitle] = { title: newDeckTitle, questions: [] };
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    return decks[newDeckTitle];
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function addCardToDeck(title, newCard) {
  let decks = await getDecks();
  decks[title].questions = [...decks[title].questions, newCard];
  try {
    await AsyncStorage.setItem("decks", JSON.stringify(decks));
    return decks;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function initDecks() {
  const decks = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };

  await AsyncStorage.setItem("decks", JSON.stringify(decks));
  return true;
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to take your test for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(16);
              tomorrow.setMinutes(19);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
