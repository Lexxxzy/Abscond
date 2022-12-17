import React, { useEffect, useRef, useState } from 'react'
import cn from "classnames";
import styles from "./AddTicket.module.sass";
import Icon from '../../Icon';
import Dropdown from '../../Dropdown';
import DropdownMultiple from '../../DropdownMultiple';
import DropdownWithSearch from '../../DropdownWithSearch';
import { addTicket, getAirports } from '../../../logic/apiCallsDashboard';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { setManagerError, unsetManagerError } from '../../../data/managerSlice';
import Snackbar, { SnackbarType } from '../../Snackbar';

const optionsWeek = ["Even", "Odd"];
const optionsAdditional = ["Meals Included", "Transfer from airport", "Travelling with pets", "Inflight WiFi",];
const optionsWeekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const AddTicket = () => {
    const { managerError, managerErrorText } = useSelector((state) => state.manager)
    const dispatch = useDispatch();

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

    const [newTicketId, setNewTicketId] = useState();
    const snackbarRef = useRef(null);
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
        if (!(departureAirport && arrivalAirport && flightWeek &&
            weekdays && departureTime && additionalOptions &&
            price && flightDuration && ticketsAmount)) {
            dispatch(setManagerError("All fields must be filled"))

            return false
        } 
        dispatch(unsetManagerError())

        const flightDurationOnluDigits = flightDuration.replace(/\D/g, '')
        let flight_duration = moment(flightDurationOnluDigits, "hmm").format('HH:mm')

        if (flight_duration === "Invalid date") {
            flight_duration = moment(flightDurationOnluDigits, "mm").format('HH:mm')

            if (flight_duration === "Invalid date") {
                dispatch(setManagerError("Invalid date in flight duration field"))

                return false
            }

            return false
        }

        if(departureAirport.airport_code === arrivalAirport.airport_code)
        {
            dispatch(setManagerError("Departure and arrival airport must be different!"))
            return false
        }
        
        const ticketInfo = {
            departureAirport, arrivalAirport, flightWeek,
            weekdays, departureTime, additionalOptions,
            price, flight_duration, ticketsAmount
        }

        addTicket(ticketInfo, dispatch, setNewTicketId, snackbarRef)
        
    }

    return (
        <>
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
                                    onChange={(e) => setPrice(e.target.value)}
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
                                    onChange={(e) => setTicketsAmount(e.target.value)}
                                    type="text"
                                    maxLength={4}
                                    placeholder="180"
                                    required
                                />
                            </div>
                            {managerError && <div className={styles.col}>
                                <div className={styles.label__error}>Error!</div>

                                <span className={styles.error}>{managerErrorText}</span>
                            </div>}
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
        {managerError ?
            <Snackbar
              ref={snackbarRef}
              message="An error occured"
              type={SnackbarType.error}
            /> :
            <Snackbar
              ref={snackbarRef}
              message={`${newTicketId} added successfully`}
              type={SnackbarType.success}
            />
          }
        </>
    )
}
