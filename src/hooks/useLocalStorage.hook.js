import { useState, useEffect } from "react";
// Кастомный хук, который добавляет записи в localStorage
export function useLocalStorage(key) {
  const [data, setData] = useState();
  // Функция, которая берет хранилище из localStorage по ключу key. И если в res что-то есть, то добавляет это что-то в нашу переменную data
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res) {
      setData(res);
    }
    // console.log("Это сам localStorage(res)", res);
  }, []);

  // Функция нашего хука, которая сохранят данные в LocalStorage
  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    // Здесь мы новые(полученные, веденные) данные сохраняем(добавляем) в переменную, которая содержала старые данные.
    setData(newData);
  };

  return [data, saveData];
}
