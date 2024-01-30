import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const RelationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState([])
    const [asd, setAsd] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount users 
                    client
                        .service("users")
                        .find({ query: { $limit: 100 } })
                        .then((res) => {
                            setName(res.data.map((e) => ({ name: e['name,email,password'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);
   useEffect(() => {
                    //on mount laravelJson 
                    client
                        .service("laravelJson")
                        .find({ query: { $limit: 100 } })
                        .then((res) => {
                            setAsd(res.data.map((e) => ({ name: e['projectname,description,auth,database,stack,services'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "LaravelJson", type: "error", message: error.message || "Failed get laravelJson" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity.name,
            asd: _entity.asd,
        };

        setLoading(true);
        try {
            
        await client.service("relation").patch(_entity._id, _data);
        const eagerResult = await client
            .service("relation")
            .find({ query: { $limit: 100 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "name",
                    service : "users",
                    select:["name","email","password"]
                }
            ,
                {
                    path : "asd",
                    service : "laravelJson",
                    select:["projectname","description","auth","database","stack","services"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info relation updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));
    const asdOptions = asd.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="relation-edit-dialog-component">
                <div>
                <p className="m-0">name:</p>
                <Dropdown value={_entity?.name?._id} options={nameOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("name", e.value)} />
            </div>
            <div>
                <p className="m-0">asd:</p>
                <Dropdown value={_entity?.asd?._id} options={asdOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("asd", e.value)} />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(RelationCreateDialogComponent);
