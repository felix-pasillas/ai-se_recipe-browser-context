import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type FavoritesContextValue = {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: new Set(),
  onToggleFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
  });

  useEffect(() => {
    const favoritesJSON = JSON.stringify([...favorites]);
    localStorage.setItem("favorites", favoritesJSON);
  }, [favorites]);

  function handleToggleFavorite(id: string) {
    const newSet = new Set(favorites);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setFavorites(newSet);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, onToggleFavorite: handleToggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
