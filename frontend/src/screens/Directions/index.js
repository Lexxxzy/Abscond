import React from 'react'
import cn from "classnames";
import styles from "./Directions.module.sass"

const directions = [
    {
        "Austria": {
            "cities": [
                "Vienna"
            ],
            "logo": "/images/countries/Austria.svg"
        }
    },
    {
        "Azerbaijan": {
            "cities": [
                "Baku"
            ],
            "logo": "/images/countries/Azerbaijan.svg"
        }
    },
    {
        "England": {
            "cities": [
                "London"
            ],
            "logo": "/images/countries/England.svg"
        }
    },
    {
        "Armenia": {
            "cities": [
                "Yerevan"
            ],
            "logo": "/images/countries/Armenia.svg"
        }
    },
    {
        "Belarus": {
            "cities": [
                "Minsk"
            ],
            "logo": "/images/countries/Belarus.svg"
        }
    },
    {
        "Vietnam": {
            "cities": [
                "Ho Chi Minh City"
            ],
            "logo": "/images/countries/Viet Nam.svg"
        }
    },
    {
        "Germany": {
            "cities": [
                "Berlin"
            ],
            "logo": "/images/countries/Germany.svg"
        }
    },
    {
        "Greece": {
            "cities": [
                "Athens"
            ],
            "logo": "/images/countries/Greece.svg"
        }
    },
    {
        "Georgia": {
            "cities": [
                "Tbilisi"
            ],
            "logo": "/images/countries/Georgia.svg"
        }
    },
    {
        "Egypt": {
            "cities": [
                "Cairo"
            ],
            "logo": "/images/countries/Egypt.svg"
        }
    },
    {
        "India": {
            "cities": [
                "Agra",
                "Mumbai",
                "Delhi",
                "Jaipur",
                "Chennai"
            ],
            "logo": "/images/countries/India.svg"
        }
    },
    {
        "Indonesia": {
            "cities": [
                "Denpasar"
            ],
            "logo": "/images/countries/Indonesia.svg"
        }
    },
    {
        "Ireland": {
            "cities": [
                "Dublin"
            ],
            "logo": "/images/countries/Ireland.svg"
        }
    },
    {
        "Spain": {
            "cities": [
                "Barcelona",
                "Madrid"
            ],
            "logo": "/images/countries/Spain.svg"
        }
    },
    {
        "Italy": {
            "cities": [
                "Florence",
                "Milan",
                "Rome",
                "Venice"
            ],
            "logo": "/images/countries/Italy.svg"
        }
    },
    {
        "Kazakhstan": {
            "cities": [
                "Alma-Ata"
            ],
            "logo": "/images/countries/Kazakhstan.svg"
        }
    },
    {
        "Kyrgyzstan": {
            "cities": [
                "Bishkek"
            ],
            "logo": "/images/countries/Kyrgyzstan.svg"
        }
    },
    {
        "China": {
            "cities": [
                "Guangzhou",
                "Hong Kong",
                "Macau",
                "Shanghai",
                "Shenzhen"
            ],
            "logo": "/images/countries/China.svg"
        }
    },
    {
        "Lithuania": {
            "cities": [
                "Vilnius"
            ],
            "logo": "/images/countries/Lithuania.svg"
        }
    },
    {
        "Malaysia": {
            "cities": [
                "Johor Bahru",
                "Kuala Lumpur"
            ],
            "logo": "/images/countries/Malaysia.svg"
        }
    },
    {
        "Mexico": {
            "cities": [
                "Cancun"
            ],
            "logo": "/images/countries/Mexico.svg"
        }
    },
    {
        "Moldova": {
            "cities": [
                "Chisinau"
            ],
            "logo": "/images/countries/Moldova.svg"
        }
    },
    {
        "Netherlands": {
            "cities": [
                "Amsterdam"
            ],
            "logo": "/images/countries/Netherlands.svg"
        }
    },
    {
        "UAE": {
            "cities": [
                "Dubai"
            ],
            "logo": "/images/countries/United Arab Emirates.svg"
        }
    },
    {
        "Russia": {
            "cities": [
                "Sochi",
                "Grozny",
                "Irkutsk",
                "Kaliningrad",
                "Khabarovsk",
                "Krasnoyarsk",
                "Samara",
                "Kazan",
                "Saint Petersburg",
                "Murmansk",
                "Moscow",
                "Novosibirsk",
                "Simferopol",
                "Yekaterinburg",
                "Ufa",
                "Yakutsk"
            ],
            "logo": "/images/countries/Russian Federation.svg"
        }
    },
    {
        "Saudi Arabia": {
            "cities": [
                "Mecca",
                "Riyadh"
            ],
            "logo": "/images/countries/Saudi Arabia.svg"
        }
    },
    {
        "Singapore": {
            "cities": [
                "Singapore"
            ],
            "logo": "/images/countries/Singapore.svg"
        }
    },
    {
        "USA": {
            "cities": [
                "Las Vegas",
                "Los Angeles",
                "Miami",
                "New York",
                "Orlando"
            ],
            "logo": "/images/countries/usa.svg"
        }
    },
    {
        "Tajikistan": {
            "cities": [
                "Dushanbe"
            ],
            "logo": "/images/countries/Tajikistan.svg"
        }
    },
    {
        "Thailand": {
            "cities": [
                "Bangkok",
                "Phuket",
                "Pattaya"
            ],
            "logo": "/images/countries/Thailand.svg"
        }
    },
    {
        "Taiwan": {
            "cities": [
                "Taipei"
            ],
            "logo": "/images/countries/Taiwan Republic of China.svg"
        }
    },
    {
        "Turkemenistan": {
            "cities": [
                "Ashgabat"
            ],
            "logo": "/images/countries/Turkmenistan.svg"
        }
    },
    {
        "Turkey": {
            "cities": [
                "Antalya",
                "Istanbul"
            ],
            "logo": "/images/countries/Turkey.svg"
        }
    },
    {
        "France": {
            "cities": [
                "Paris"
            ],
            "logo": "/images/countries/France.svg"
        }
    },
    {
        "Czech Republic": {
            "cities": [
                "Prague"
            ],
            "logo": "/images/countries/Czech Republic.svg"
        }
    },
    {
        "South Africa": {
            "cities": [
                "Johannesburg"
            ],
            "logo": "/images/countries/South Africa.svg"
        }
    },
    {
        "South Korea": {
            "cities": [
                "Seoul"
            ],
            "logo": "/images/countries/Korea South.svg"
        }
    },
    {
        "Japan": {
            "cities": [
                "Osaka",
                "Tokyo"
            ],
            "logo": "/images/countries/Japan.svg"
        }
    }
]
const Direction = () => {
    return (
        <div className={cn("section-mb80", styles.section)}>
            <div className={cn("container", styles.container)}>
                <div className={styles.title}><h1>Directions</h1></div>
                <div className={styles.wrapper}>
                
                    {
                        directions.map((country, i) => (
                            <div className={styles.country} key={i}>

                                <h4 className={styles.header}>
                                    <span className={styles.flag}>
                                        <img width={24} src={directions[i][Object.keys(country)]["logo"]} alt={Object.keys(country)} />
                                    </span>
                                    {Object.keys(country)}
                                </h4>
                                <ul className={styles.cities}>
                                    {directions[i][Object.keys(country)]["cities"].map((city, j) => (
                                        <li key={j}>
                                            - {city}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Direction;