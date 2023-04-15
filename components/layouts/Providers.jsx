import store from "@/redux/store";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });
  return (
    <>
      <Provider store={store}>
        <MantineProvider
          emotionCache={myCache}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          {children}
        </MantineProvider>
      </Provider>
    </>
  );
}
