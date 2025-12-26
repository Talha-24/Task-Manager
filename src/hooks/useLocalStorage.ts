const useLocalStorage = () => {

    const getTheme = ():string | null => {
       return localStorage.getItem("theme");
    }

    const setTheme = (theme: string) => {
        localStorage.setItem("theme", theme)
    }

    const removeTheme = () => {
        localStorage.removeItem("theme");
    }

    const getValue = (key: string) => {
        return JSON.parse(localStorage.getItem(key) as string);
    }

    const setValue = (key: string, value: string | undefined) => {

        value = JSON.stringify(value);
        localStorage.setItem(key, value);

    }

    const removeValue = (key: string) => {
        localStorage.removeItem(key);
    }

    return {
        getTheme,
        setTheme,
        getValue,
        setValue,
        removeValue,
        removeTheme,
    }
}
export default useLocalStorage