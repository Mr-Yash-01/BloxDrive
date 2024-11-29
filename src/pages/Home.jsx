import { useEffect, useCallback, useState, useRef } from 'react';
import { ethers } from 'ethers';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { contractAtom, currentAccountAtom, currentFragmentAtom, deleteTapedAtom, deletingStatusAtom, folderDataAtom, giveAccessTapedAtom, givingAccessAtom, isCreateFolderTappedAtom, isDroppingAtom, isFolderCreatingAtom, isOptionsTapedAtom, mainLoadingAtom, pathAtom, secretAtom, selectedFileManuplationAtom, selectedFilesAtom, sharedDataAtom, showCreateAtom, toAddressAtom, toBeSearchAtom } from '../store/atoms/commonLegends';
import { IoMdClose } from "react-icons/io";
import { ImFilesEmpty } from "react-icons/im";
import { MdUploadFile, MdOutlineCreateNewFolder } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import MySpace from './MySpace';
import SharedWithMe from './SharedWithMe';
import SharedToPeople from './SharedToPeople';
import Fragments from '../components/Fragments';
import FileDetailsFloting from '../components/FileDetailsFloting';
import DeleteAlert from '../components/DeleteAlert';
import NewFolderNameInputFloting from '../components/NewFolderNameInputFloting';
import SelectedFilesFloting from '../components/SelectedFilesFloting';
import SelectedFilesFixed from '../components/SelectedFilesFixed';
import SelectedFilesManuplationFixed from '../components/SelectedFilesManuplationFixed';
import DropFilesHere from '../components/DropFilesHere';
import { fetchSharedData } from '../backend/fetchSharedData';
import { createFolder } from '../backend/createFolder';
import { getFolderData } from '../backend/getFolderData';
import contractData from '../Smooth.json';

export default function Home() {
    const [account, setAccount] = useRecoilState(currentAccountAtom);
    const [currentFragment, setCurrentFragment] = useRecoilState(currentFragmentAtom);
    const [path, setPath] = useRecoilState(pathAtom);
    const [folderData, setFolderData] = useRecoilState(folderDataAtom);
    const [contractInstance, setContractInstance] = useRecoilState(contractAtom);
    const [showCreate, setShowCreate] = useRecoilState(showCreateAtom);
    const [isConnectingToWallet, setIsConnectingToWallet] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesAtom);
    const [uploadingStatus, setUploadingStatus] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isOptionsTaped, setIsOptionsTaped] = useRecoilState(isOptionsTapedAtom);
    const [selectedFileManuplation, setSelectedFileManuplation] = useRecoilState(selectedFileManuplationAtom);
    const [deleteTaped, setDeleteTaped] = useRecoilState(deleteTapedAtom);
    const [deletingStatus, setDeletingStatus] = useRecoilState(deletingStatusAtom);
    const [giveAccessTaped, setGiveAccessTaped] = useRecoilState(giveAccessTapedAtom);
    const [givingAccess, setGivingAccess] = useRecoilState(givingAccessAtom);
    const [toAddress, setToAddress] = useRecoilState(toAddressAtom);
    const [sharedData, setSharedData] = useRecoilState(sharedDataAtom);
    const searchRef = useRef(null);
    const [isDropping, setIsDropping] = useRecoilState(isDroppingAtom);
    const [toBesearch, setToBeSearch] = useRecoilState(toBeSearchAtom);
    const [isFolderCreating, setIsFolderCreating] = useRecoilState(isFolderCreatingAtom);
    const [isCreateFolderTapped, setIsCreateFolderTapped] = useRecoilState(isCreateFolderTappedAtom);
    const secret = useRecoilValue(secretAtom);
    const setMainLoading = useSetRecoilState(mainLoadingAtom);

    useEffect(() => {
        const getSharedData = async () => {
            if (currentFragment === 0 || currentFragment === 2) {
                setSelectedFileManuplation({});
                let data = await fetchSharedData(contractInstance, account);
                data = JSON.parse(data);
                setSharedData(data);
            }
        };
        getSharedData();
    }, [currentFragment]);

    const initializeWalletConnection = async () => {
        try {
            const { contractInstance, account } = await connectWallet();
            if (contractInstance && account) {
                await checkAndCreateRoot(contractInstance, account);
            } else {
                console.error("Failed to initialize wallet connection: contractInstance or account is missing.");
            }
        } catch (error) {
            console.error("Error in initializeWalletConnection:", error);
        }
    };

    const connectWallet = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {

            setFolderData([]);
            setCurrentFragment(1);
            setSelectedFileManuplation({});
            setIsConnectingToWallet(true);

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const accounts = await provider.listAccounts();

                if (!accounts || !accounts[0]) {
                    console.error("No accounts found after requesting MetaMask access.");
                    setIsConnectingToWallet(false);
                    return { contractInstance: null, account: null };
                }

                setAccount(accounts[0].address);

                if (!secret || !secret.contractAddress || !contractData || !contractData.abi) {
                    console.error("Contract address or ABI is missing. Please check your configuration.");
                    setIsConnectingToWallet(false);
                    return { contractInstance: null, account: null };
                }

                const tempContract = new ethers.Contract(
                    secret.contractAddress,
                    contractData.abi,
                    signer
                );

                setContractInstance(tempContract);
                setIsConnectingToWallet(false);

                return { contractInstance: tempContract, account: accounts[0].address };
            } catch (error) {
                console.error("Error creating contract or connecting wallet:", error);
                setIsConnectingToWallet(false);
                return { contractInstance: null, account: null };
            }
        } else {
            console.warn("MetaMask is not installed or not detected.");
            setIsConnectingToWallet(false);
            setMainLoading(1);
            return { contractInstance: null, account: null };
        }
    }, []);



    // Function to create the root if it doesn't exist and fetch folder data
    const checkAndCreateRoot = useCallback(async (contractInstance, account) => {
        if (contractInstance && account) {
            try {
                // Check if user root exists

                const checkExist = await contractInstance.checkUserRoot(account);

                // Assuming checkExist is a boolean or a non-empty value means it exists
                if (checkExist === false || checkExist === '0x') {
                    // User root doesn't exist, create it
                    const createBase = await contractInstance.initUserRoot(account);
                    const receipt = await createBase.wait();

                    if (receipt.status !== 1) {
                        return
                    }
                }
                // else {
                //     console.log('User root already exists');
                // }

                // Fetch the folder data after root check or creation
                const data = await getFolderData(contractInstance, path, account);
                setFolderData(data);

            } catch (error) {
                console.error('Error calling contract method:', error);
                // Additional error handling, possibly notify the user
            }
        } else {
            console.error('Invalid contractInstance or account');
            // Handle invalid parameters if needed
        }
    }, [getFolderData, path, account]);

    // Initial fetch to connect wallet, check root existence, and fetch folder data
    useEffect(() => {
        initializeWalletConnection();
    }, [connectWallet, checkAndCreateRoot]);

    // Listen for account changes and reinitialize
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', async () => {

            await connectWallet();
        });
    }
    // else {
    //     console.log('Ethereum provider not found');
    // }

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleFileChange = async (event) => {
        const selectedFiles = Array.prototype.slice.call(event.target.files);

        // Ensure folderData and folderData.files are defined before accessing them
        if (folderData && Array.isArray(folderData.files)) {
            // Check if any of the selected files already exist in folderData's files field
            const existingFiles = selectedFiles.filter(file =>
                folderData.files.some(existingFile => existingFile.name === file.name)
            );

            if (existingFiles.length > 0) {
                alert('Some selected files already exist');
                setSelectedFiles(null);
                // Handle the case where selected files already exist
            } else {
                setSelectedFiles(selectedFiles);
                // Handle the case where all selected files are unique
            }
        } else {
            console.error("folderData or folderData.files is not properly initialized.");
            // Handle the case where folderData or folderData.files is undefined
            setSelectedFiles(selectedFiles);
        }

        // Save the selected files to state
    };

    return (
        <div className="flex flex-col bg-[#1b1b20] text-[#e3e3e3] min-w-full max-w-full min-h-full ">
            {/* Header Section */}
            <div className='flex flex-col justify-between p-4 gap-4 bg-[#1b1b20] sticky top-0 z-10 md:flex-row md:gap-32 lg:justify-between'>
                <div className='flex flex-row items-center justify-between md:flex-col'>
                    <div className='flex flex-row items-center'>
                        <img className='w-10 h-10' src='/icons8-blockchain-100.png' alt='logo' />
                        <h1 className='text-2xl font-bold'>BloxDrive</h1>
                    </div>
                    <h1 className='underline'>{account.substring(0, 6)} ... {account.substring(account.length - 4)}</h1>
                </div>
                <div className='flex items-center max-w-xl rounded-full mr-4 bg-[#282a2c] py-2 px-4 gap-3 md:flex-grow md:my-2'>
                    <FaSearch className='text-[#e3e3e3] placeholder-opacity-90' />
                    <input
                        className='flex flex-grow bg-transparent border-none focus:outline-none text-[#e3e3e3]'
                        type='text'
                        placeholder='Search in BloxDrive'
                        ref={searchRef}
                        onChange={(e) => { setToBeSearch(e.target.value.trim()) }}
                    />
                </div>
            </div>

            <div className=' bg-[#1b1b20] pr-4'>

                <aside
                    id="default-sidebar"
                    className="fixed bottom-0 overflow-y-auto max-h-[900px] lg:bottom-auto lg:left-0 lg:z-40 w-full lg:w-56 bg-[#1b1b20] h-16 lg:h-screen transition-transform sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full  lg:h-auto px-3 py-4 lg:overflow-y-auto lg:flex lg:flex-col lg:items-start flex justify-around items-center">

                        <Fragments />

                        {/* Divider and Create Button - Visible on lg screens */}
                        <div className="hidden lg:block w-full">
                            <hr className="opacity-20 mt-4" />

                            <button className={`flex flex-row gap-2 px-4 py-4 shadow-black items-center shadow-md justify-items-center  hover:bg-[#105682] border-2 border-[#105682] rounded-xl  mt-4 w-full`}
                                onClick={() => setIsCreateFolderTapped(true)} >
                                <MdOutlineCreateNewFolder className="w-6 h-6" />
                                <h1 className='text-base'>Create Folder</h1>
                            </button>

                            {(isCreateFolderTapped) ?
                                <div className='hidden lg:block'>
                                    <div className=' mt-4 rounded-xl shadow-[#105682] overflow-hidden shadow-sm bg-[#131314]'>
                                        <div className='flex px-2  bg-[#105682] items-center'>
                                            <ImFilesEmpty className='w-6 h-6' />
                                            <h1 className='bg-[#105682] p-2 text-xl'>
                                                Folder Name
                                            </h1>
                                            <button onClick={() => setIsCreateFolderTapped(false)} className='items-center ml-auto '>
                                                <IoMdClose className='w-6 h-6 ' />
                                            </button>
                                        </div>
                                        <input type='text' onChange={(e) => {
                                            setNewFolderName(e.target.value);
                                        }} className='bg-[#131314] focus:outline-none h-12 text-[#e3e3e3] p-2 overflow-hidden' placeholder='Folder Name' />


                                    </div>
                                    {isFolderCreating ? (
                                        <button
                                            className={`flex flex-row justify-self-center w-fit p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl mt-4`}
                                        >
                                            <span className="w-6 h-6 loader" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={async () => {
                                                setIsFolderCreating(true);

                                                try {
                                                    console.log("Creating folder...");
                                                    const res = await createFolder(newFolderName, contractInstance, path, account, folderData);

                                                    if (res) {
                                                        console.log("Folder created successfully!");
                                                        const updatedData = await getFolderData(contractInstance, path, account);
                                                        setFolderData(updatedData);
                                                        setIsCreateFolderTapped(false);
                                                    } else {
                                                        alert("Operation rejected by user.");
                                                    }
                                                } catch (error) {
                                                    console.error("Error during folder creation:", error);
                                                    alert("An unexpected error occurred.");
                                                } finally {
                                                    setIsFolderCreating(false);
                                                }
                                            }}
                                            className={`flex flex-row justify-self-center w-fit p-4 shadow-black items-center shadow-md justify-items-center bg-[#105682] rounded-xl mt-4 hover:bg-[#13415e]`}
                                        >
                                            <IoMdAdd className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>
                                : null}

                            <button
                                className={`flex flex-row gap-2 px-4 py-4 shadow-black items-center shadow-md justify-items-center  hover:bg-[#105682] border-2 border-[#105682] rounded-xl mt-4 w-full }`}
                                onClick={() => {
                                    setShowCreate(!showCreate);
                                    handleButtonClick(); // Trigger the file input click
                                }}
                            >
                                <MdUploadFile className="w-6 h-6" />
                                <h1 className="text-base">Upload Files</h1>
                            </button>

                            {/* Hidden file input for multiple file selection */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple // Allows selection of multiple files
                            />

                            {(selectedFiles) ?
                                <SelectedFilesFixed />
                                : null}
                        </div>
                    </div>


                    {
                        (selectedFileManuplation.name) ?
                            <SelectedFilesManuplationFixed />
                            : null
                    }


                </aside>


                {/* Content Part */}

                {(isDropping) ? <DropFilesHere /> :

                    (currentFragment === 0) ?
                        <SharedWithMe /> :
                        (currentFragment === 1) ?
                            <MySpace />
                            : <SharedToPeople />
                }
            </div>


            {/* Floting parts */}

            <div className={`fixed  bottom-20 right-20  overflow-hidden rounded-full rotate-90 lg:hidden ${(currentFragment === 1) ? 'block' : 'hidden'}`}>
                <MdUploadFile onClick={async () => {
                    handleButtonClick();
                }} className='w-12 h-12 bg-[#105682] text-white p-3 -rotate-90 cursor-pointer' />
                <MdOutlineCreateNewFolder onClick={() => {
                    setIsCreateFolderTapped(true);
                }
                } className='w-12 h-12 bg-[#105682] text-white p-3 -rotate-90 cursor-pointer' />
            </div>

            {(selectedFiles) ?
                <SelectedFilesFloting />
                : null}

            {(isCreateFolderTapped) ?
                <NewFolderNameInputFloting />
                : null}

            {
                (deleteTaped) ?
                    (

                        <DeleteAlert />
                    )
                    : null
            }

            {
                (selectedFileManuplation.name) ?

                    <FileDetailsFloting />
                    : null
            }

        </div>
    );
}

