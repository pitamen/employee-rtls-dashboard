const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


export const userNameToName = (name) => {
    const [firstName, lastName] = name.split('.');
    return `${capitalize(firstName)} ${capitalize(lastName??'')}`
}