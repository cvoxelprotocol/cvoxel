import { useTab } from "@/hooks/useTab"
import { FC } from "react"

export const HomeTabsHeader:FC = () => {

    const {tabState, setTabState} = useTab()

    return (
        <>
            <div className="flex w-full px-4 text-center">
                <ul
                    className={"flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-full items-center justify-center md:px-10"}
                    role="tablist"
                >
                    <li className="-mb-px last:mr-0 flex-auto text-center">
                        <a
                            className={
                            "text-xs md:text-sm font-bold px-2 py-1 md:px-5 md:py-3 leading-normal " + 
                            (tabState === 'cvoxels' ? " text-primary " : " text-secondary ")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setTabState('cvoxels');
                            }}
                            data-toggle="tab"
                            href="#cvoxels"
                            role="tablist"
                        >
                            CVoxels
                        </a>
                    </li>
                    <li className="-mb-px flex-auto text-center">
                        <a
                            className={
                            "text-xs md:text-sm font-bold px-2 py-1 md:px-5 md:py-3 leading-normal " + 
                            (tabState === 'transactions' ? " text-primary " : " text-secondary ")}
                            onClick={e => {
                            e.preventDefault();
                            setTabState('transactions');
                            }}
                            data-toggle="tab"
                            href="#transactions"
                            role="tablist"
                        >
                            Potential CVoxels
                        </a>
                    </li>
                    <li className="-mb-px flex-auto text-center">
                        <a
                            className={
                            "text-xs md:text-sm font-bold px-2 py-1 md:px-5 md:py-3 leading-normal " + 
                            (tabState === 'signatures' ? " text-primary " : " text-secondary ")}
                            onClick={e => {
                            e.preventDefault();
                            setTabState('signatures');
                            }}
                            data-toggle="tab"
                            href="#signatures"
                            role="tablist"
                        >
                            Sig Requests
                        </a>
                    </li>
                </ul>
            </div>
            <div className="relative flex flex-1 w-full max-w-[1056px] h-[1px] border-t border-secondary overflow-scroll"></div>
        </>
    )
}