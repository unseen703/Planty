import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    height: "auto",
   
    // maxHeight: "600px",
  },
  
  card: {
    display: "flex",
    width: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      overflow: "hidden",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    display: "flex",  
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20px",
  
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },

  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
 
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  rmedia: {
 
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundBlendMode: 'darken',
  },
  rborder: {
    border: 'solid',
  },

  rcard: {
    height: "100%",
    width: "150px",
    display: "flex",
    position: "relative",
    overflowy: "auto",
    margin: "5px",
    borderRadius: "15px",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
     justifyContent: "space-around",

    }
  },
  roverlay: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    color: 'white',
  },
  rgrid: {
    display: 'flex',
  },
  rdetails: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  rtitle: {
    padding: '0 16px',
  },
  mainContainer: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap : "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      alignItems : 'center',
      justifyContent: 'space-around',
    }
  },
  rcardAction: {
    display: "block",
    textAlign: "initial",
  },
  
}));
