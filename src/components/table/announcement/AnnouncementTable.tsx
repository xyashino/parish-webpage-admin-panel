import {BaseTable} from "@components/ui/Table/BaseTable";
import {AnnouncementsResponse} from "@backendTypes";
import {AnnouncementTableRow} from "@components/table/announcement/AnnouncementTableRow";


interface Props {
    announcements:Omit<AnnouncementsResponse, 'announcements'>[];
}

export const AnnouncementTable = ({announcements}:Props)=>{
    const thColumns = ['tytuł','podtytuł','status']
    return <BaseTable thColumns={thColumns}>
        {announcements.map((data,i)=> <AnnouncementTableRow data={data} index={i} key={data.id}/>)}
    </BaseTable>
}