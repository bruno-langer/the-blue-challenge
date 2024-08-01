import { colors } from "../utils/colors";
import logoPath from '../assets/logo.svg'
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";


export default function NavBar() {

    const { data, setData } = useContext(DataContext)

    return <nav style={{ display: 'flex', boxSizing: "border-box", width: '100vw', height: "3em", alignItems: "center", backgroundColor: colors.primary, justifyContent: "space-between", padding: "0 20px" }}>
        <img src={logoPath} alt="" />

        <div style={{ display: 'flex', alignItems: "center" }}>
            <select
                onChange={(e) => setData({ ...data, selectedCompany: e.target.value })}
                name=""
                id=""
                style={{ backgroundColor: colors.blue800, color: "white", border: "none", borderRadius: "4px", width: "10em", height: "2.25em", fontFamily: "Inter" }}>
                {data.companies.map(company => <option value={company.id}>{company.name}</option>)}
            </select>
        </div>
    </nav>

}