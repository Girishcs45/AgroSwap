import { BOOKINGS } from "../Data/Bookings";
import { TOOLS } from "../Data/Tools";
import { Users } from "../Data/Users";

export function seedLocalStorage() {
  if (!localStorage.getItem("agroBookings")) {
    localStorage.setItem("agroBookings", JSON.stringify(BOOKINGS));
  }

  if (!localStorage.getItem("agroTools")) {
    localStorage.setItem("agroTools", JSON.stringify(TOOLS));
  }

  if (!localStorage.getItem("agroUsers")) {
    localStorage.setItem("agroUsers", JSON.stringify(Users));
  }
}
