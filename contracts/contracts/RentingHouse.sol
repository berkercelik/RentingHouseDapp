// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

contract RentingHouseContract{    

    //counter
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    //owner
    address private owner;

    //PropOwner struct
    
    struct PropOwner {
         address propOwnerWallet;
         string name;
    }

    //Tenant struct
    struct Tenant {
        uint rentedPropId;
        address _tenantAddress;
        string name;
    }

    //Property struct
    struct Property {
        uint propId;
        string _locAddress;
        Type _type;
        Status _status;
        string comments;
    }

    //Agreement struct
    struct Agreement {
        uint agreementId;
        uint256 leaseStart;
        uint256 leaseEnd;        
    }

    //enum for property status

    enum Type{
        Flat,
        Shop
    }

    enum Status{
        onRent,
        inUse
    }

    //events

    event PropertyAdded(uint indexed propId, string _locAddress, string comments);
    event PropertyMetaDataEdited(uint indexed propId, string _locAddress, Type _type, string comments);
    event PropertyStatusEdited(uint indexed propId, Status _status);
    event OwnerAdded(address indexed propOwnerWallet, string name);
    event TenantAdded(uint indexed rentedPropId, address indexed _tenantAddress, string name);
    event AgreementApproved(uint indexed agreementId, address indexed _tenantAddress, uint indexed propId, uint256 leaseStart, uint256 leaseEnd);
    event AgreementTerminated(uint indexed agreementId, uint indexed propId);


    //owner tenant agreement mapping
    mapping(address=> PropOwner) private propOwners;
    mapping(uint=> Property) private properties;
    mapping(uint=> Agreement) private agreements;
    mapping(address=> Tenant) private tenants;

    //constructor
    constructor(){
        owner = msg.sender;
    }

    //modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this func.");
        _;
    }    

    //functions
    function setOwner(address _newOwner) external onlyOwner{
        owner = _newOwner;        
    }

    function addOwner(string calldata name) external {
        require(!isOwner(msg.sender), "Owner already exists");

        propOwners[msg.sender] = PropOwner(msg.sender, name);

        emit OwnerAdded(msg.sender, propOwners[msg.sender].name);
    }
    
    function addProperty(string calldata _locAddress, Type _type, string calldata comments) external onlyOwner{
        _counter.increment();
        uint counter = _counter.current();
        properties[counter] = Property(counter, _locAddress, _type, Status.onRent, comments);
        emit PropertyAdded(counter, properties[counter]._locAddress, properties[counter].comments);
    }

    function addTenant(string calldata name) external {
        require(!isTenant(msg.sender), "Tenat already exists");
        _counter.increment();
        uint counter = _counter.current();

        tenants[msg.sender] = Tenant(counter, msg.sender, name);

        emit TenantAdded(counter, msg.sender, tenants[msg.sender].name);
    }

    function editPropertyMetaData(uint propId, string calldata _locAddress, Type _type, string calldata comments) external{
        require(properties[propId].propId !=0 , "Property given ID does not exist");
        
        Property storage property = properties[propId];

        if(bytes(_locAddress).length != 0){
            property._locAddress = _locAddress;
        }        
        property._type = _type;        

        if(bytes(comments).length !=0){
            property.comments = comments;
        }
        
        emit PropertyMetaDataEdited(propId, property._locAddress, property._type, property.comments);
    }

    function editPropertyStatus(uint propId, Status _status) external onlyOwner {
        require(properties[propId].propId != 0, "Property with given ID does not exist");

        properties[propId]._status = _status;

        emit PropertyStatusEdited(propId, _status);
    }

    //add only tenant
    function agreementApproval(uint id, uint256 leaseStart, uint256 leaseEnd) external {
        require(isOwner(msg.sender), "Owner does not exist");
        require(properties[id]._status == Status.onRent, "Property is not available for rent now");
        require(tenants[msg.sender].rentedPropId == 0, "Tenant has already rented a prop");
        require(leaseStart<leaseEnd, "End date cannot be earlier then Start date");

        _counter.increment();
        uint counter = _counter.current();

        tenants[msg.sender].rentedPropId = id;
        properties[id]._status = Status.inUse;

        agreements[counter] = Agreement(counter, leaseStart, leaseEnd);
        

        emit AgreementApproved(counter, msg.sender, id, agreements[counter].leaseStart, agreements[counter].leaseEnd);
    }

    //terminate agreement
    function terminateAgreement(uint id, uint propId) external onlyOwner {
        require(isOwner(msg.sender), "Owner does not exist");
        require(properties[id]._status == Status.inUse, "Property is already on rent");
        
        delete tenants[msg.sender].rentedPropId;
        delete properties[propId]._status;
        delete agreements[id];

        emit AgreementTerminated(id, propId);
    }
    

    //querry functions
    //Owner
    function getOwner() external view returns(address) {
        return owner;
    }
    //isOwner
    function isOwner(address propOwnerWallet) private view returns(bool){
        return propOwners[propOwnerWallet].propOwnerWallet != address(0);
    }
    //isTenant
    function isTenant(address _tenantAddress) private view returns(bool){
        return tenants[_tenantAddress]._tenantAddress != address(0);
    }

    //getPropOwner
    function getPropOwner(address propOwnerWallet) external view returns(PropOwner memory){
        require(isOwner(propOwnerWallet), "Property Owner does not exist");
        return propOwners[propOwnerWallet];
    }

    //getProperties
    function getProperties(uint propId) external view returns(Property memory){
        require(properties[propId].propId != 0, "Property does not exist");
        return properties[propId];
    }

    //getPropertyByStatus

    function getPropertyByStatus(Status _status) external view returns(Property[] memory) {
        uint count = 0;
        uint length = _counter.current();

        for(uint i = 1; i <= length; i++){
            if(properties[i]._status == _status) {
                count++;
            }
        }

        Property[] memory propWithStatus  = new Property[](count);
        count = 0;

        for(uint i=1; i <= length; i++){
            if(properties[i]._status == _status) {
                propWithStatus[count] = properties[i];
                count++;
            }
        }
    }

    //getCurrentCount

    function getCurrentCount() external view returns(uint) {
        return _counter.current();
    }

    
}