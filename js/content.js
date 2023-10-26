class ConvertHrefPlay {
    constructor() {
        const numberLength = document.getElementsByClassName("style_1")
            .length;
        const numberLengthSearchTab = document.getElementsByClassName("wrapper").length;
        if (numberLength) {
            for (let i = 0; i < numberLength; i++) {
                if (document.getElementsByClassName("style_1")[i]?.children[0]) {
                    const elem = document.getElementsByClassName("style_1")[i]
                        ?.children[0]?.children[0]?.children[0];
                    const id = document
                        .getElementsByClassName("style_1")[i]?.children[1]?.children[1]?.children[0]?.getAttribute("href");
                    const url = "https://vidsrc.to/embed" + id;
                    elem.href = url;
                }
            }
        }
        if (numberLengthSearchTab) {
            for (let i = 0; i < numberLengthSearchTab; i++) {
                if (document.getElementsByClassName("wrapper")[i]?.children[0]) {
                    const elem = document.getElementsByClassName("wrapper")[i]
                        ?.children[0]?.children[0]?.children[0];
                    const id = document
                        .getElementsByClassName("wrapper")[i].children[1]?.children[0]?.children[0]?.children[0]?.children[0].getAttribute("href");
                    const url = "https://vidsrc.to/embed" + id;
                    elem.href = url;
                }
            }
        }
    }
}
