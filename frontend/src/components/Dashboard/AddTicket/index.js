import React, { useEffect, useState } from 'react'
import cn from "classnames";
import styles from "./AddTicket.module.sass";
import Icon from '../../Icon';
import Dropdown from '../../Dropdown';
import DropdownMultiple from '../../DropdownMultiple';
import DropdownWithSearch from '../../DropdownWithSearch';
import { getAirports } from '../../../logic/apiCallsDashboard';
import moment from "moment";

const optionsWeek = ["Even", "Odd"];
const optionsAdditional = ["Meals Included", "Transfer from airport", "Travelling with pets", "Inflight WiFi",];
const optionsWeekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const AddTicket = () => {
    const [departureAirports, setDepartureAirports] = useState([]);
    const [departureAirport, setDepartureAirport] = useState({});

    const [arrivalAirports, setArrivalAirports] = useState([]);
    const [arrivalAirport, setArrivalAirport] = useState({});

    const [flightWeek, setFlightWeek] = useState(optionsWeek[0]);
    const [weekdays, setWeekdays] = useState([]);
    const [departureTime, setDepartureTime] = useState("");
    const [additionalOptions, setaAdditionalOptions] = useState([])
    const [dropdownDepartureSearch, setDropdownDepartureValue] = useState("");
    const [dropdownArrivalSearch, setDropdownArrivalValue] = useState("");
    const [pending, setPending] = useState();
    const [price, setPrice] = useState();
    const [ticketsAmount, setTicketsAmount] = useState();
    const [flightDuration, setFlightDuration] = useState();
    
    useEffect(() => { 
        getAirports(setPending, setDepartureAirports, dropdownDepartureSearch, setDepartureAirport); 
        getAirports(setPending, setArrivalAirports, dropdownArrivalSearch, setArrivalAirport); 
    }, [])

    const handleKeyUp = (e) => {

        if (is_numeric(e.key) && departureTime.length < 5) {
            setDepartureTime((prev) => e.target.value)

            var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;

            if (1 <= i) num.splice(2, 0, ':');
            e.target.value = num.join('');
        }
        if (e.key === "Backspace") {
            setDepartureTime((prev) => prev.slice(0, -1))
        }
    }

    function is_numeric(str) {
        return /^\d+$/.test(str);
    }

    const onSearchDepartureAirport = () => 
        getAirports(setPending, setDepartureAirports, dropdownDepartureSearch);
    
    const onSearchArrivalAirport = () => 
        getAirports(setPending, setArrivalAirports, dropdownArrivalSearch);

    // TODO
    const handleAddTicket = () => {
        const flight_duration = moment(flightDuration.replace(/\D/g,''),"hmm").format('HH:mm')
        if (flight_duration==="Invalid date")
        {
            console.log("error")
        }

        console.log({departureAirport, arrivalAirport, flightWeek, 
            weekdays, departureTime, additionalOptions, 
            price, flight_duration, ticketsAmount})
    }

    return (
        <form className={styles.section}>
            <div className={styles.head}>
                <div className={cn("h2", styles.title)}>Add Ticket</div>
            </div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.category}>Ticket info</div>
                    <div className={styles.fieldset}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Departure Time</div>
                                <input
                                    className={styles.input}
                                    name="departure-time"
                                    type="text"
                                    maxLength={5}
                                    placeholder={departureTime === "" ? "00:00" : departureTime}
                                    onKeyUp={handleKeyUp}
                                    required
                                />
                            </div>

                            <div className={styles.col}>
                                <div className={styles.label}>Flight Duration</div>
                                <input
                                    className={styles.input}
                                    name="flight-duration"
                                    type="text"
                                    maxLength={32}
                                    placeholder="5H 15M"
                                    required
                                    onChange={(e) => setFlightDuration(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Departure Airport</div>
                                
                            <DropdownWithSearch
                                    className={styles.dropdown}
                                    value={departureAirport}
                                    disabled
                                    setValue={setDepartureAirport}
                                    options={departureAirports}
                                    dropdownValue={dropdownDepartureSearch}
                                    setDropdownValue={setDropdownDepartureValue}
                                    onSearch={onSearchDepartureAirport}
                                />
                            </div>

                            <div className={styles.col}>
                                <div className={styles.label}>Arrival Airport</div>
                                <DropdownWithSearch
                                    className={styles.dropdown}
                                    value={arrivalAirport}
                                    disabled
                                    setValue={setArrivalAirport}
                                    options={arrivalAirports}
                                    dropdownValue={dropdownArrivalSearch}
                                    setDropdownValue={setDropdownArrivalValue}
                                    onSearch={onSearchArrivalAirport}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Flight days</div>
                                <DropdownMultiple
                                    className={styles.dropdown}
                                    value={weekdays}
                                    disabled
                                    setValue={setWeekdays}
                                    options={optionsWeekdays}
                                    isDays={true}
                                />
                            </div>
                            <div className={styles.col}>
                                <div className={styles.label}>Flight Week</div>
                                <Dropdown
                                    className={styles.dropdown}
                                    value={flightWeek}
                                    disabled
                                    setValue={setFlightWeek}
                                    options={optionsWeek}
                                />
                            </div>
                            <div className={styles.col}>
                                <div className={styles.label}>Additional Options</div>
                                <DropdownMultiple
                                    className={styles.dropdown}
                                    value={additionalOptions}
                                    disabled
                                    setValue={setaAdditionalOptions}
                                    options={optionsAdditional}
                                    isDays={false}
                                />
                            </div>
                            <div className={styles.col}>
                                <div className={styles.label}>Ticket Price (RUB.)</div>
                                <input
                                    className={styles.input}
                                    name="price"
                                    onChange={(e) =>setPrice(e.target.value)}
                                    type="text"
                                    maxLength={15}
                                    placeholder="29999"
                                    required
                                />
                            </div>
                            <div className={styles.col}>
                            <div className={styles.label}>Tickets amount</div>
                            <input
                                className={styles.input}
                                name="amount"
                                onChange={(e) =>setTicketsAmount(e.target.value)}
                                type="text"
                                maxLength={4}
                                placeholder="180"
                                required
                            />
                        </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.controls}>
                <button className={cn("button", styles.button)} type="button" onClick={handleAddTicket}>Add Tickets</button>
                <button className={styles.clear}>
                    <Icon name="close" size="16" />
                    Reset fields
                </button>
            </div>

        </form>
    )
}
