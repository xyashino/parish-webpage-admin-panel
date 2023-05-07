import React from "react";
import {MainContainer} from "@components/ui/MainContainer";
import {Header} from "@components/ui/Header";
import {ExpandableContent} from "@components/ui/ExpandableContent";


export const HomePage = ()=>{
    return <MainContainer>
        <Header title="Witaj w panelu administracji strony Parafia Gruszów Wielki" />
        <h1 className='my-16 text-5xl font-bold capitalize'>FAQ Dotyczące Zarządania stroną:</h1>
        <ExpandableContent title='Dlaczego nie strony w wersji Mobilnej?'>
            <div className='prose w-full bg-accent p-4'>
                <p className='font-bold uppercase'>
                  Niestety nie wyrobiłbym się przed terminem końcowym
                </p>
            </div>
        </ExpandableContent>

        <ExpandableContent title='Do czego służą statusy w  ogłoszeniach ?'>
            <div className='prose w-full bg-accent p-4'>
                Ma to na celu proste zadanie ponieważ w każdy poniedziałek ogłoszenia ze satusem <span className='font-bold uppercase'> "UPCOMING"</span> są zamieniane na <span className='font-bold uppercase'> "ACTIVE"</span>
                <p>Natomiast  ogłoszenia ze statusem <span className='font-bold uppercase'> "ACTIVE"</span> sa wyświetlane na głównej stronie</p>
                <p>Tą Logike chce zaimplementować w intencjach</p>
            </div>
        </ExpandableContent>

        <ExpandableContent title='Co to są grupy Galeri?'>
        <div className='prose w-full bg-accent p-4'>
            <p className='font-bold uppercase'>
                Grupy odpowiadają za lewy panel podczas przeglądania galeri na stronie.
            </p>
            <p>
                Dzięki temu możesz podzielić albumy na <span className='font-bold uppercase'>"GRUPY"</span>  :D
            </p>
        </div>
    </ExpandableContent>
        <ExpandableContent title='Jak dodać zdjęcie do albumu ? '>
            <div className='prose w-full bg-accent p-4'>
                <p className='font-bold uppercase'>
                   Pierw musisz dodać ALBUM
                </p>
                <p className='font-bold uppercase'>
                    Następnie klikasz w wiersz tabeli gdzie chcesz dodac zdjęcia.
                </p>
                <p className='font-bold uppercase'>
                    Dzięki temu otworzy się panel w którym mozesz edytować album oraz dodawać zdjęcia do danego albumu.
                </p>
            </div>
        </ExpandableContent>

        <ExpandableContent title='Co robi guzik AKTUALIZUJ DATE '>
            <div className='prose w-full bg-accent p-4'>
                <p className='font-bold uppercase'>
                   Szuka pierwszego całego tygodnia poniedziałek - niedziela i ustawia automatycznie daty
                </p>
            </div>
        </ExpandableContent>

        <ExpandableContent title='Dlaczego nie mogę usunąc Administratora?'>
            <div className='prose w-full bg-accent p-4'>
               <p className='font-bold uppercase'>
                   Nie da się Usunąć:
                   <span className='ml-2 font-medium'>
                        Konta zapasowego oraz Konta na którym jesteś aktualnie zalogowany
                   </span>
               </p>
            </div>
        </ExpandableContent>
    </MainContainer>
}