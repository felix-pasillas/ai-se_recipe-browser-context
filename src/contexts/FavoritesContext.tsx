import { createContext } from "react";

type FavoritesContextValue = {
  favorites: Set<string>;
};

export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: new Set(),
});
