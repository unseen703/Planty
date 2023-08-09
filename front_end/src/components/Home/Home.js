import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { getPosts ,getPostsBySearch} from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";
// import useStyles
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
// import memories from "../../images/memories.png";
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currId, setCurrId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
 
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const searchPost = () => {
    if (search.length != 0 || tags.length != 0) {
      // dispatch -> fetch searched posts
      dispatch(getPostsBySearch({search, tags:tags.join(",")}));

      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push(`/`);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPost();
      // histrory.push(`/search/${searchQuery}`);
    }
  };
  const clear = () => {
    setTags([]);
    setSearch("");
  };
  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid  item xs={12} sm={6} md={9}>
              <Posts setCurrId={setCurrId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
  //              style={{
  //          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgb(45 234 14)"

  // }}
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  className={classes.search}
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                 // onKeyPress={handleKeyPress}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <ChipInput
                  className={classes.search}
                  name="tags"
                  variant="outlined"
                  label="Search Tags"
                  fullWidth
                  value={tags}
                  style={{ margin: "10px 0" }}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
                <Button
                  onClick={clear}
                  style={{ marginTop: "2px"}}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  clear
                </Button>
              </AppBar>
              <Form currId={currId} setCurrId={setCurrId} />
              {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
