import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Chip, Container, Divider } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserGroup } from "../../api/UserGroupDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import GeneralButton from "../../components/buttons/GeneralButton";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import DataTable from "../../components/table/DataTable";

const ViewUserGroup: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    } else {
      dispatch(ChangeTab({ currenttab: "User Groups" }));
    }
  }, [dispatch, navigate, userrole]);
  const [features, setFeatures] = useState<any[]>([]);

  const UserGroupQuery = useQuery(
    [`usergroup${params.id}`, params.id],
    () => GetUserGroup(params.id),
    {
      onSuccess: (data) => {
        const featurestoset = data.data[0].Features.map((feature) => {
          return {
            id: feature.FeatureID,
            name: feature.FeatureName,
            access: feature.FeatureRight,
          };
        });
        setFeatures(featurestoset);
      },
    }
  );

  const headers: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Feature Name", width: 350 },
    { field: "access", headerName: "Access Rights", width: 190 },
  ];

  if (UserGroupQuery.isLoading || UserGroupQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <Box>
      {UserGroupQuery.status === "success" && (
        <Container className="cardcontainer shadow">
          <h2 className="cardheader">
            {UserGroupQuery.data.data[0].UserGroupName}
          </h2>
          <div
            className="cardsubheading"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                UserGroupQuery.data.data[0].UserGroupDesc
              ).replace(
                /href/g,
                `target='_blank' rel="noreferrer noopener" href`
              ),
            }}
          />
          <Divider sx={{ mb: 3 }}>
            <Chip label="Features" sx={{ fontWeight: 500 }} />
          </Divider>
          <div
            className="flexcontainer cardfield"
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            <p className="cardfieldlabel">Feature List:</p>
          </div>
          <div className="flexcontainer cardtable">
            {UserGroupQuery.data.data[0].Features.length > 0 ? (
              <DataTable data={features} headers={headers} />
            ) : (
              <p className="cardfieldvalue">No features assigned</p>
            )}
          </div>

          <div
            className="flexcontainer"
            style={{
              flexDirection: "row",
              marginLeft: "7%",
              marginRight: "7%",
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => navigate("/usergroups")}
              type="button"
            >
              <ArrowBackIosIcon fontSize="small" /> Back
            </button>
            <GeneralButton
              text="Edit Details"
              clickfunction={() => navigate(`/editusergroup/${params.id}`)}
            />
            {/* <motion.button
              style={{ alignSelf: "flex-end" }}
              className="mainbutton"
              onClick={() => navigate(`/editusergroup/${params.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Details
            </motion.button> */}
          </div>
        </Container>
      )}
    </Box>
  );
};
export default ViewUserGroup;
