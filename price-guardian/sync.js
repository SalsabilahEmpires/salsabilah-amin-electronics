// CONFIGURATION FOR SALSABILAH AMIN EMPIRES
const OFFICIAL_SOURCES = {
    MINISTER: "https://ministerbd.com/api/products",
    BUTTERFLY: "https://butterflygroupbd.com/api/v1/pricing"
};

const EMPIRE_CONFIG = {
    DOMAIN: "salsabilah.com",
    SMS_API: "9957b74834b6681bca3660749917d404134724ff49426",
    UK_REG: "09814720"
};

async function syncPrice() {
    try {
        const response = await fetch(OFFICIAL_SOURCES.MINISTER);
        const data = await response.json();
        
        // LOGIC: PRICE MUST NEVER EXCEED OFFICIAL SITE
        data.products.forEach(product => {
            if (product.price < current_db_price) {
                updateEmpireDB(product.id, product.price);
                sendAlert(`Price Dropped for ${product.name}. Sync Successful.`);
            }
        });
    } catch (error) {
        console.error("Sync Failed: Contacting Salsabilah Tech Support");
    }
}
