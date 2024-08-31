# Developer Guide

## Main Components

1. **App**
   - Parent component of `Home`.
   - **Key Takeaways and Functionalities:**
     - Sets the width and height to 100vw and 100vh for the application, ensuring these properties are inherited by child components.

2. **Home**
   - Manages the layout and renders the sub-main components `ChatInterface` and `HistoryInterface`.
   - Divides the layout for mobile and desktop views.
   - **Key Takeaways and Functionalities:**
     - Maintains the state for `isMobile`, `conversationHistory`, and `menuOpen` (for mobile view).
     - Based on the `conversationHistory` state, renders `ChatInterface` when false and `HistoryInterface` when true.
     - Renders the `MenuIcon` for mobile view and `CancelIcon` when the menu is open, along with `MenuItem`.

3. **ChatInterface**
   - Sets the layout for `ChatMessages` and `ChatActions`. The component has a width of 95% and a height of 100%.
   - Maintains the state for `messages` and `aiData` (loaded from `sampleData.json`).
   - Renders the `ChatMessages` and `ChatActions` components.
   - **Key Takeaways and Functionalities:**
     - Renders the `BotIntro` component based on the length of `messages`.
     - Fetches `sampleData.json` and updates the `aiData` when the component renders (`fetchMessages` function).
     - Implements a match function to match user messages with `aiData` to provide predefined responses (`matchPrompt` function).
     - The `onAskHandler` function formats and updates the `messages` state with new user and bot messages.
     - The `onSaveHandler` function saves `messages` in `localStorage` via the `ChatActions` component.
     - Uses `date-fns` functions to format the `date` property of `userMessage` and `botMessage`.

4. **HistoryInterface**
   - Renders the conversation history with `backToChat` and `filter` elements.
   - Has a width of 95% and a height of 80%, with overflow set to `auto`.
   - Maintains the restructured and filtered `messages` state.
   - **Key Takeaways and Functionalities:**
     - Re-structures the `messages` from `localStorage`, grouping `bot` and `user` messages at the same index in the array.
     - Filters conversations based on `1-5` star ratings using `filter` functions.
     - Each message is rendered by the `ChatCard` component in `readonly` mode.

## Main Sub-Components

1. **ChatActions**
   - Handles form submission with user input and stores data in local storage.
   - **Key Takeaways and Functionalities:**
     - Maintains the state of the `message`.
     - Lifts the state of `message` to `ChatInterface` via the `onAsk` callback prop.
     - Invokes the `onSave` callback prop to save the conversation.

2. **ChatMessages**
   - Iteratively renders the `ChatMessage` component based on the `messages` array.
   - Has a width of 95% and a height of 75%, with overflow set to `auto`.
   - **Key Takeaways and Functionalities:**
     - Receives the `messages` prop from `ChatInterface`.
     - Automatically scrolls into view whenever the `messages` array changes, using a referenced `div` element.

3. **ChatMessage**
   - Controlled by the state of `message` received from `ChatMessages` as a prop.
   - **Key Takeaways and Functionalities:**
     - Renders `UserMessage` and `BotMessage` components based on the `from` field in the message.

4. **BotMessage**
   - Renders the `botMessage` with `feedback` and `rating` fields.
   - This component operates in `readonly` mode to prevent changes to its state.
   - User can be add feedback with `Modal` and Rating with `RatingComponent`
   - **Key Takeaways and Functionalities:**
     - Maintains hover state with `starShow` and `show` states.
     - Manages the feedback modal with `showModal` state.
     - Implements logical rendering throughout the component.
## UI Components
1. **Modal**
   -  Renders child component in `overlays` portal element wit postion `absolute`
1. **Chat Card**
   -  Renders child component with consistance card design.
 

## Set Up Project

0. Clone the project:
   ```bash
   git clone <this repository-url>
1. Install  packeges
    ```javaScript
    $ npm install

2. Intall vite@ latest
    ```JavaScript
    $ npm instll -g vite@latest
3. Run the Application
   ```JavaScript
   $ npm run dev


[Figma Designs](!https://www.figma.com/design/DYoSNliUDL3DlpgHPLlc0r/Bot-AI?node-id=1-113&t=ne0te2MzH5yd2zX9-0)

[Design Guide](!https://docs.google.com/document/d/1SYWc8WwSVPA31NGRmG-Cng5V4GOTBZU565Z5EOivTIE/edit#heading=h.9n9hrx4m50ny)

https://codesandbox.io/p/sandbox/bot-ai-5sgfm7?file=%2Fsrc%2Fcomponents%2FChattingCard%2FChattingCard.jsx%3A120%2C32