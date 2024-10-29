"use client";
import React from 'react';

const InquiryForm = () => {
    const [addingStop, setAddingStop] = React.useState(false);
    const [stopLocation, setStopLocation] = React.useState("");

    const [state, setState] = React.useState({
        "service_type": "Charter",
        "pick_up_date": "",
        "pick_up_time": "",
        "pick_up_location": "",
        "stops": [],
        "drop_off_location": "",
        "number_of_passengers": 1,
        "luggage_count": 0,
        "child_seat_added": false
    });

    let service_types = [
        "Charter",
        "From Airpoirt",
        "To Airport",
        "Hourly/As Directed",
        "Point to Point",
    ]

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
    }

    return (
        <div className="flex flex-row space-x-2 w-full">
            <div className="flex flex-col w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-md">
                    {/* Service Type */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Select Service Type</label>
                        <select
                            name="service_type"
                            value={state.service_type}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        >
                            {service_types.map((service_type, index) => (
                                <option key={index} value={service_type}>{service_type}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-row space-x-2'>
                        {/* Pick-Up Date */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-gray-700 font-medium">Pick-Up Date</label>
                            <input
                                type="date"
                                name="pick_up_date"
                                value={state.pick_up_date}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 mt-1"
                            />
                        </div>

                        {/* Pick-Up Time */}
                        <div className="flex flex-col w-1/2">
                            <label className="text-gray-700 font-medium">Pick-Up Time</label>
                            <input
                                type="time"
                                name="pick_up_time"
                                value={state.pick_up_time}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 mt-1"
                            />
                        </div>
                    </div>

                    {/* Pick-Up Location */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Pick-Up Location</label>
                        <input
                            type="text"
                            name="pick_up_location"
                            placeholder="Your pick-up location"
                            value={state.pick_up_location}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        />
                    </div>

                    {/* Stops */}
                    {
                        state.stops.length > 0 && (
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium">Stops</label>
                                <ul className="list-disc list-inside">
                                    {state.stops.map((stop, index) => (
                                       <li key={index} className='text-gray-700'>{stop}
                                        <span className='text-red-500 cursor-pointer' onClick={() => {
                                            let stops = state.stops.filter((_, i) => i !== index);
                                            setState({ ...state, stops });
                                        }}>
                                            &nbsp;[Remove]
                                        </span>
                                       </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }

                    {/* Add Stop */}
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={() => setAddingStop(!addingStop)}
                            className="p-2 bg-gray-200 rounded-md"
                        >
                            {addingStop ? "Cancel" : "Add Stop"}
                        </button>
                    </div>


                    <div className="flex flex-col">
                        {addingStop && (
                            <>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-medium">Stop Location</label>
                                    <input
                                        type="text"
                                        name="stop_location"
                                        placeholder="Your stop location"
                                        value={stopLocation}
                                        onChange={(e) => setStopLocation(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 mt-1"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                stops: [...state.stops, stopLocation]
                                            });
                                            setStopLocation("");
                                            setAddingStop(false);
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Add Stop
                                    </button>
                                </div>
                            </>
                        )}
                    </div>



                    {/* Drop-Off Location */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Drop-Off Location</label>
                        <input
                            type="text"
                            name="drop_off_location"
                            placeholder="Your drop-off location"
                            value={state.drop_off_location}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        />
                    </div>

                    {/* Number of Passengers */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Number of Passengers</label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setState({ ...state, number_of_passengers: Math.max(1, state.number_of_passengers - 1) })}
                                className="p-2 bg-gray-200 rounded-md"
                            >-</button>
                            <input
                                type="number"
                                name="number_of_passengers"
                                value={state.number_of_passengers}
                                readOnly
                                className="w-12 text-center border border-gray-300 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setState({ ...state, number_of_passengers: state.number_of_passengers + 1 })}
                                className="p-2 bg-gray-200 rounded-md"
                            >+</button>
                        </div>
                    </div>

                    {/* Luggage Count */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Luggage Count</label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setState({ ...state, luggage_count: Math.max(0, state.luggage_count - 1) })}
                                className="p-2 bg-gray-200 rounded-md"
                            >-</button>
                            <input
                                type="number"
                                name="luggage_count"
                                value={state.luggage_count}
                                readOnly
                                className="w-12 text-center border border-gray-300 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setState({ ...state, luggage_count: state.luggage_count + 1 })}
                                className="p-2 bg-gray-200 rounded-md"
                            >+</button>
                        </div>
                    </div>

                    {/* Child Seat */}
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-700 font-medium">Add Child Seat</label>
                        <button
                            type="button"
                            onClick={() => setState({ ...state, child_seat_added: !state.child_seat_added })}
                            className={`p-2 rounded-md ${state.child_seat_added ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {state.child_seat_added ? "Remove Child Seat" : "Add Child Seat"}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col w-1/2">
                <pre className="p-6 bg-gray-100 rounded-lg shadow-md">
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default InquiryForm;