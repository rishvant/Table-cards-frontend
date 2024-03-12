import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavbarWithMegaMenu } from "../components/Navbar";

const Cards = () => {
    const [editingCardIndex, setEditingCardIndex] = useState(null);
    const [cards, setCards] = useState([]);
    const [addingCard, setAddingCard] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const firstNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const newFirstNameRef = useRef();
    const newEmailRef = useRef();
    const newPhoneRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/card");
                setCards(response.data.cards);
            } catch (err) {
                console.log("Error:", err);
            }
        };
        fetchData();
    }, []);

    const handleEditing = (index) => {
        setEditingCardIndex(index);
    };

    const handleSave = async (card) => {
        const firstName = firstNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        try {
            await axios.put(`http://localhost:3000/card/${card}`, {
                firstName,
                email,
                phone,
            });
            window.location.reload();
            setEditingCardIndex(null);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleDelete = async (card) => {
        try {
            await axios.delete(`http://localhost:3000/card/${card}`);
            window.location.reload();
        }
        catch (err) {
            console.log("Error:", err);
        }
    }
    
    const handleSaveNewCard = async (e) => {
        e.preventDefault();
        const firstName = newFirstNameRef.current.value;
        const email = newEmailRef.current.value;
        const phone = newPhoneRef.current.value;
        try {
            const response = await axios.post("http://localhost:3000/card", { firstName, email, phone });
            console.log(response.data);
            setCards([...cards, { firstName, email, phone }]);
            setAddingCard(false);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleAddCard = () => {
        setAddingCard(true);
    };
    
    const handleCancelCard = () => {
        setAddingCard(false);
    };

    const filteredCards = cards.filter((card) => {
        const values = Object.values(card).join(" ").toLowerCase();
        return values.includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <NavbarWithMegaMenu />
            <div className="flex flex-col items-center mt-10">
                <Button onClick={handleAddCard}>Add Card</Button>
                <div className="w-full md:w-72 mt-5">
                    <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {addingCard && (
                    <form onSubmit={handleSaveNewCard}>
                        <Card className="mt-6 m-5 w-25">
                            <CardBody>
                                <input className="m-2" style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px" }} type="text" placeholder="First Name" ref={newFirstNameRef} required />
                                <input className="m-2" style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px" }} type="email" placeholder="Email" ref={newEmailRef} required />
                                <input className="m-2" style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px" }} type="tel" placeholder="Phone Number" ref={newPhoneRef} required />
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button className="mr-2" type="submit">
                                    Save
                                </Button>
                                <Button className="mr-2" onClick={handleCancelCard}>
                                    Cancel
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                )}
                {searchTerm && (
                    <h3 class="block font-sans text-4xl mt-10 antialiased font-semibold leading-tight tracking-normal text-inherit">
                        Search Results
                    </h3>
                )}
                <div className="flex flex-row flex-wrap w-3/4">
                    {searchTerm && filteredCards.map((card, index) => (
                        <>
                            <Card key={index} className="mt-6 w-96 m-5 w-25">
                                <CardBody className="flex flex-col">
                                    {editingCardIndex === index ? (
                                        <>
                                            <input
                                                style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}
                                                type="text"
                                                defaultValue={card.firstName}
                                                ref={firstNameRef}
                                            />
                                            <input
                                                style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}

                                                type="text"
                                                defaultValue={card.email}
                                                ref={emailRef}
                                            />
                                            <input
                                                style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}
                                                type="text"
                                                defaultValue={card.phone}
                                                ref={phoneRef}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                {card.firstName}
                                            </Typography>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                {card.email}
                                            </Typography>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                {card.phone}
                                            </Typography>
                                        </>
                                    )}
                                </CardBody>
                                <CardFooter className="pt-0">
                                    {editingCardIndex === index ? (
                                        <Button className="mr-2" onClick={() => handleSave(card._id)}>
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            className="mr-2"
                                            onClick={() => handleEditing(index)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button onClick={() => handleDelete(card._id)}>Delete</Button>
                                </CardFooter>
                            </Card>
                        </>
                    ))}
                </div>
                <h3 class="block font-sans text-4xl mt-10 antialiased font-semibold leading-tight tracking-normal text-inherit">
                    Cards
                </h3>
                <div className="flex flex-row flex-wrap mt-10 w-3/4">
                    {cards && cards.map((card, index) => (
                        <Card key={index} className="mt-6 w-96 m-5 w-25">
                            <CardBody className="flex flex-col">
                                {editingCardIndex === index ? (
                                    <>
                                        <input
                                            style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}
                                            type="text"
                                            defaultValue={card.firstName}
                                            ref={firstNameRef}
                                        />
                                        <input
                                            style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}

                                            type="text"
                                            defaultValue={card.email}
                                            ref={emailRef}
                                        />
                                        <input
                                            style={{ border: "solid", borderRadius: "10px", padding: "5px", paddingLeft: "10px", marginTop: "5px" }}
                                            type="text"
                                            defaultValue={card.phone}
                                            ref={phoneRef}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {card.firstName}
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {card.email}
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {card.phone}
                                        </Typography>
                                    </>
                                )}
                            </CardBody>
                            <CardFooter className="pt-0">
                                {editingCardIndex === index ? (
                                    <Button className="mr-2" onClick={() => handleSave(card._id)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        className="mr-2"
                                        onClick={() => handleEditing(index)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                <Button onClick={() => handleDelete(card._id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Cards;