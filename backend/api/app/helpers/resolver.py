ADDITIONAL_OPTIONS = ["Meals Included", "Transfer from airport", "Travelling with pets", "Inflight WiFi"]

def get_path_to_airline_logo(airline):
    path = "/images/content/airlines/"

    if airline == "Аэрофлот":
        return path + "aeroflot.png"

    elif airline == "S7 Airlines":
        return path + "S7.png"

    elif airline == "Singapore Airlines":
        return path + "singapore.png"

    elif airline == "Air New Zealand":
        return path + "zeland.png"

    elif airline == "Qantas":
        return path + "qantas.png"

    elif airline == "Qatar Airways":
        return path + "qatar.png"

    elif airline == "Virgin Australia":
        return path + "virgin.png"

    elif airline == "Emirates":
        return path + "emirates.png"

    elif airline == "EVA Air":
        return path + "eva.png"

    elif airline == "Ural Airlines":
        return path + "ural.png"

    return "NOT_VALID_INPUT"


def get_country_flag_path(country):
    path = "/images/countries/"
    if country == "Австрия":
        return path + "Austria.svg"

    elif country == "Азербайджан":
        return path + "Azerbaijan.svg"

    elif country == "Англия":
        return path + "England.svg"

    elif country == "Армения":
        return path + "Armenia.svg"

    elif country == "Беларусь":
        return path + "Belarus.svg"

    elif country == "Вьетнам":
        return path + "Viet Nam.svg"

    elif country == "Германия":
        return path + "Germany.svg"

    elif country == "Греция":
        return path + "Greece.svg"

    elif country == "Грузия":
        return path + "Georgia.svg"

    elif country == "Египет":
        return path + "Egypt.svg"

    elif country == "Индия":
        return path + "India.svg"

    elif country == "Индонезия":
        return path + "Indonesia.svg"

    elif country == "Ирландия":
        return path + "Ireland.svg"

    elif country == "Испания":
        return path + "Spain.svg"

    elif country == "Италия":
        return path + "Italy.svg"

    elif country == "Казахстан":
        return path + "Kazakhstan.svg"

    elif country == "Киргизия":
        return path + "Kyrgyzstan.svg"

    elif country == "Китай":
        return path + "China.svg"

    elif country == "Литва":
        return path + "Lithuania.svg"

    elif country == "Малайзия":
        return path + "Malaysia.svg"

    elif country == "Мексика":
        return path + "Mexico.svg"

    elif country == "Молдавия":
        return path + "Moldova.svg"

    elif country == "Нидерланды":
        return path + "Netherlands.svg"

    elif country == "ОАЭ":
        return path + "United Arab Emirates.svg"

    elif country == "Россия":
        return path + "Russian Federation.svg"

    elif country == "Саудовская Аравия":
        return path + "Saudi Arabia.svg"

    elif country == "Сингапур":
        return path + "Singapore.svg"

    elif country == "США":
        return path + "usa.svg"

    elif country == "Таджикистан":
        return path + "Tajikistan.svg"

    elif country == "Тайвань":
        return path + "Taiwan Republic of China.svg"

    elif country == "Таиланд":
        return path + "Thailand.svg"

    elif country == "Туркеменистан":
        return path + "Turkmenistan.svg"

    elif country == "Турция":
        return path + "Turkey.svg"

    elif country == "Франция":
        return path + "France.svg"

    elif country == "Чехия":
        return path + "Czech Republic.svg"

    elif country == "ЮАР":
        return path + "South Africa.svg"

    elif country == "Южная Корея":
        return path + "Korea South.svg"

    elif country == "Япония":
        return path + "Japan.svg"

    return "NOT_VALID_INPUT"

def convert_week(week):
    week = week.strip()
    if week == "Even":
        return True
    elif week == "Odd":
        return False
    else:
        return "Invalid week type"
    
def convert_days(days):
    new_days = []
    for day in days:
        if day == 'Monday':
            new_days.append('1')
        elif day == 'Tuesday':
            new_days.append('2')
        elif day == 'Wednesday':
            new_days.append('3')
        elif day == 'Thursday':
            new_days.append('4')
        elif day == 'Friday':
            new_days.append('5')
        elif day == 'Saturday':
            new_days.append('6')
        elif day == 'Sunday':
            new_days.append('7')
        else:
            return "Invalid weekday format"
        
    return '{' + ','.join(new_days) + '}'

def convert_additional_options(options):
    if len(options) == 0:
        return None
    
    if not all(option in ADDITIONAL_OPTIONS for option in options):
        return "Invalid additional options"
    
    return '{' + ','.join(map('"{0}"'.format, options)) + '}'