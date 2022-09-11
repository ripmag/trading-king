import axios from "axios";
const TOKEN ="ccedobaad3i6bee0tc0g"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})