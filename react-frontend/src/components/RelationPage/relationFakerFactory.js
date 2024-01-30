
import { faker } from "@faker-js/faker";
export default (count,nameIds,asdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
asd: asdIds[i % asdIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
