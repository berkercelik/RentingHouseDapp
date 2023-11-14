import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { checkWalletConnection, addOwner,getPropOwner,addProperty,getProperty,addTenant,editPropertyMetaData,editPropertyStatus,approveAgreement,terminateAgreement} from '../utils/ethereum';

export default function Home() {

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [getOwner, setgetOwner] = useState(false);

  const [ownerName, setOwnerName] = useState(''); 
  const [ownerAddress, setOwnerAddress] = useState('');
  const [queriedOwner, setQueriedOwner] = useState(null);

  const [locAddress, setLocAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [comments, setComments] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [queriedProperty, setQueriedProperty] = useState(null);

  const [tenantName, setTenantName] = useState('');

  const [propId, setPropId] = useState('');
  const [type, setType] = useState('');

  const [status, setStatus] = useState('');

  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');

  const [agreementId, setAgreementId] = useState('');

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }       

    const checkConnection = async () => {
      await checkWalletConnection(setIsConnected);
    };
    checkConnection();
  }, []);

  const handleConnect = async () => {
    await checkWalletConnection(setIsConnected);
  };


  //owner
  const handleAddOwner = async () => {
    if (ownerName) {
      await addOwner(ownerName);
    } else{
      console.error("owner name cannot be empty");
    }

  };

  const handleGetOwner = async () => {
    if (ownerAddress) {
      const owner = await getPropOwner(ownerAddress);
      setQueriedOwner(owner);
    } else {
      console.error('Owner address cannot be empty.');
    }
  };

  //property
  const handleAddProperty = async () => {
    if (locAddress && propertyType && comments) {
      await addProperty(locAddress, propertyType, comments);
    } else {
      console.error('Please fill in all fields.');
    }
  };

  const handleGetProperty = async () => {
    if (propertyId) {
      const property = await getProperty(propertyId);
      console.log(setQueriedProperty(property));
      setQueriedProperty(property);
    } else {
      console.error('Please enter a property ID.');
    }
  };

  //tenant
  const handleAddTenant = async () => {
    if (tenantName) {
      await addTenant(tenantName);
    } else {
      console.error('Tenant name cannot be empty.');
    }
  };

  const handleEditPropertyMetaData = async () => {
    if (propId && (locAddress || type || comments)) {
      await editPropertyMetaData(propId, locAddress, type, comments);
    } else {
      console.error('Please fill in the required fields.');
    }
  };

  const handleEditPropertyStatus = async () => {
    if (propId && status) {
      await editPropertyStatus(propId, status);
    } else {
      console.error('Please fill in the required fields.');
    }
  };

  const handleApproveAgreement = async () => {
    if (propertyId && leaseStart && leaseEnd) {
      await approveAgreement(propertyId, leaseStart, leaseEnd);
    } else {
      console.error('Please fill in the required fields.');
    }
  };

  const handleTerminateAgreement = async () => {
    if (agreementId && propertyId) {
      await terminateAgreement(agreementId, propertyId);
    } else {
      console.error('Please fill in the required fields.');
    }
  };


  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <button className={styles.connectedButton} onClick={handleConnect}>{!isConnected ? "Connect" : "Connected"}</button>
      </div>

      <h1>Renting House DApp</h1>
      <div className={styles.line}>
        <h2>Add Owner and Show Owner</h2>
        <label>
          Owner Name: 
          <input className={styles.inputs} type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </label>
        <button onClick={handleAddOwner} className={styles.normalButton}>Add Owner</button>        

        <label>
          Owner Address:
          <input type="text" value={ownerAddress} onChange={(e) => setOwnerAddress(e.target.value)} />
        </label>
        <button onClick={handleGetOwner}  className={styles.normalButton}>Get Owner</button>
      </div>

      <div className={styles.line}>
        {queriedOwner && (
          <div>
            <h2>Queried Owner:</h2>
            <p>Address: {queriedOwner.propOwnerWallet}</p>
            <p>Name: {queriedOwner.name}</p>
          </div>
        )}
      </div>
      <h2 style={{margin: 2 + 'em'}}></h2>

      <div className={styles.line}>
      <h2>Property Management</h2>

        {/* Add Property Section */}
        <label>
          Location Address:
          <input type="text" value={locAddress} onChange={(e) => setLocAddress(e.target.value)} />
        </label>
        <label>
          Property Type:
          <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />
        </label>
        <label>
          Comments:
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
        </label>
        <button onClick={handleAddProperty} className={styles.normalButton}>Add Property</button>      

        {/* Get Property Section */}
        <label>
          Property ID:
          <input type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        </label>
        <button onClick={handleGetProperty} className={styles.normalButton}>Get Property</button>

        {/* Display Queried Property */}
        {queriedProperty && (
          <div>
            <h2>Queried Property:</h2>
            <p>ID: {queriedProperty.id}</p>
            <p>Location Address: {queriedProperty.locAddress}</p>
            <p>Type: {queriedProperty.type}</p>
            <p>Comments: {queriedProperty.comments}</p>
          </div>
        )}

      </div>

      <h2 style={{margin: 2 + 'em'}}></h2>

      <div className={styles.line}>

        <h2>Add Tenant</h2>
        {/* Add Tenant Section */}
        <label>
          Tenant Name:
          <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
        </label>
        <button onClick={handleAddTenant} className={styles.normalButton}>Add Tenant</button>
        
        <h2 style={{margin: 2 + 'em'}}></h2>

        <h2>Property Metadata Management</h2>

        {/* Edit Property Metadata Section */}
        <label>
          Property ID:
          <input type="text" value={propId} onChange={(e) => setPropId(e.target.value)} />
        </label>
        <label>
          New Location Address:
          <input type="text" value={locAddress} onChange={(e) => setLocAddress(e.target.value)} />
        </label>
        <label>
          New Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>
          New Comments:
          <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
        </label>
        <button onClick={handleEditPropertyMetaData} className={styles.normalButton}>Edit Property Metadata</button>
      
      </div>
      <h2 style={{margin: 2 + 'em'}}></h2>

      <div className={styles.line}>
        <h2>Edit Property Status to</h2>
        <h2>"On Rent" or "In Use"</h2>

        {/* Edit Property Status Section */}
        <label>
          Property ID:
          <input type="text" value={propId} onChange={(e) => setPropId(e.target.value)} />
        </label>
        <label>
          New Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <button onClick={handleEditPropertyStatus} className={styles.normalButton}>Edit Property Status</button>

      </div>
      
      <h2 style={{margin: 2 + 'em'}}></h2>

      <div className={styles.line}>
        <h2>Agreement Approval</h2>

        {/* Approve Agreement Section */}
        <label>
          Property ID:
          <input type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        </label>
        <label>
          Lease Start:
          <input type="text" value={leaseStart} onChange={(e) => setLeaseStart(e.target.value)} />
        </label>
        <label>
          Lease End:
          <input type="text" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} />
        </label>
        <button onClick={handleApproveAgreement} className={styles.normalButton}>Approve Agreement</button>
      </div>


      <h2 style={{margin: 2 + 'em'}}></h2>

      <div className={styles.line}>
        <h2>Agreement Termination</h2>

        {/* Terminate Agreement Section */}
        <label>
          Agreement ID:
          <input type="text" value={agreementId} onChange={(e) => setAgreementId(e.target.value)} />
        </label>
        <label>
          Property ID:
          <input type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        </label>
        <button onClick={handleTerminateAgreement} className={styles.normalButton}>Terminate Agreement</button>
      </div>

      <h2 style={{margin: 2 + 'em'}}></h2>
    </div>  
        
  );
}
