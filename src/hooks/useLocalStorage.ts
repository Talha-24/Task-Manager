const useLocalStorage = () => {

    const getTheme = () => {
        localStorage.getItem("theme");
    }

    const setTheme = (theme: string) => {
        localStorage.setItem("theme", theme)
    }


    const getValue = (key: string) => {
        return localStorage.getItem(key);
    }

    const setValue = (key: string, value: string) => {

        value = JSON.stringify(value);
        localStorage.setItem(key, value);

    }

    return {
        getTheme,
        setTheme,
        getValue,
        setValue,
    }
}
export default useLocalStorage