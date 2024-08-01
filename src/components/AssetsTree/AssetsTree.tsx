import { useCallback, useContext, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import AssetTreeItem from "./AssetTreeItem";
import './style.css'

const createDataTree = (dataset: any) => {
    const hashs: any = {};
    dataset.forEach((data: any) => hashs[data.id] = { ...data, childNodes: [] });
    const dataTree: any = [];
    dataset.forEach((data: any) => {
        if (data.parentId)
            hashs[data.parentId].childNodes.push(hashs[data.id])
        else if (data.locationId)
            hashs[data.locationId].childNodes.push(hashs[data.id])
        else
            dataTree.push(hashs[data.id])
    });
    return dataTree;
};

const recursiveFilter = (treeArray: any[], searchText: string): any[] => {
    return treeArray.reduce((acc: any[], item: any) => {
        const filteredChild = recursiveFilter(item.childNodes || [], searchText);
        const hasChild = filteredChild.length > 0;

        if (item.name.toLowerCase().includes(searchText.toLowerCase()) || hasChild) {
            const newItem = { ...item, childNodes: filteredChild };
            return [...acc, newItem];
        }

        return acc;
    }, []);
}



export default function AssetsTree() {

    const { data, setData } = useContext(DataContext)
    const [openIdsArray, setOpensIdArray] = useState<string[]>([])
    const [searchText, setSearchText] = useState("")
    const [type, setFilterType] = useState("")
    const searchArray = [...data.locations, ...data.assets.map((asset: any) => ({ ...asset, assetSection: true }))]
    const tree = createDataTree(searchArray)


    const recursiveTypeFilter = useCallback((treeArray: any[], type: string): any[] => {

        const parentIds: string[] = []

        const res = treeArray.reduce((acc: any[], item: any) => {
            const filteredChild = recursiveTypeFilter(item?.childNodes || [], type);
            const hasChild = filteredChild.length > 0;
            if (type === 'status')
                if (item.status === "alert" || hasChild) {
                    parentIds.push(item.id)
                    const newItem = { ...item, childNodes: filteredChild };
                    return [...acc, newItem];
                }
            if (type === 'type')
                if (item.sensorType === "energy" || hasChild) {
                    parentIds.push(item.id)
                    const newItem = { ...item, childNodes: filteredChild };
                    return [...acc, newItem];
                }
            return acc;
        }, []);

        return res
    }, [data])

    const typeFiltered = type.trim() !== "" ? recursiveTypeFilter(tree, type) : tree
    const filteredSearchTree = searchText.trim() !== "" ? recursiveFilter(typeFiltered, searchText) : typeFiltered;


    const renderChild = (arr: any[]) => {
        return <> {arr.map((a) => {
            return <AssetTreeItem obj={a} openIdsArray={openIdsArray} toggle={toggle} renderChild={renderChild} isChild isFiltered={type !== ""} />
        })}</>
    }


    const toggle = (obj: any) => {

        if (obj.sensorType === "vibration" || obj.sensorType === "energy")
            setData({ ...data, selectedComponent: obj })

        if (openIdsArray.includes(obj.id))
            setOpensIdArray(openIdsArray.filter((i) => i !== obj.id))
        else
            setOpensIdArray([...openIdsArray, obj.id])
    }

    return <div className="container">
        <div id="assets-input-search" className="search-container">
            <input type="text" name="" id="" onChange={(e) => setSearchText(e.target.value)} value={searchText} placeholder="Buscar Ativo ou Local" />
        </div>
        <div id="assets-commands" style={{ display: "flex", gap: "1em", padding: "0.5em" }}   >

            <span className={type === "type" ? "chip-energy" : `chip`} onClick={() => setFilterType("type")}>Medidores Energia</span>
            <span className={type === "status" ? "chip-alert" : `chip`} onClick={() => setFilterType("status")}>Sensores em Alerta</span>

            {type !== "" && <span className={`chip`} onClick={() => { setOpensIdArray([]); setFilterType("") }}>Limpar Filtros</span>}

        </div>

        <div id="assets-tree" style={{ height: "90%", overflowY: "auto", maxHeight: "80vh" }}>

            {filteredSearchTree.map((location: any) => {
                return <AssetTreeItem obj={location} openIdsArray={openIdsArray} toggle={toggle} renderChild={renderChild} isFiltered={type !== ""} />
            })}
        </div>
    </div>
}