export default class Text {
    static capitalizeFirstLetter(string) {
        string = string.toLowerCase(); //everything lowercase first
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}