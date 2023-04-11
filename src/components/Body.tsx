import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import OBR from "@owlbear-rodeo/sdk";
import { Header } from "./Header";
import { AvatarGroup, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Tooltip } from "@mui/material";
import { Map } from "@mui/icons-material";
import { encounterTypes, getRandomEncounters } from "../data/encounters";

export function Body() {
  const [playerRole, setPlayerRole] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [encounterType, setEncounterType] = useState('')
  const [randomEncounters, setRandomEncounters] = useState([])
  useEffect(() => {
    OBR.player.getRole().then(setPlayerRole);
  }, []);

  useEffect(() => {
    OBR.action.setHeight(890);
    OBR.action.setWidth(470);
  }, []);

  const handleGenerateRandomEncounters = () => {
    if (encounterType) {
      const enc: any = getRandomEncounters(encounterType)
      setRandomEncounters(enc)
    }
  }

  return (
    <Stack height="100vh">
      <Header
        action={
          <AvatarGroup max={20} spacing="small">
            <Tooltip title="Random Encounter">
              <IconButton
                sx={{ boxShadow: currentTab === 0 ? "0px 0px 0px 1px white;" : '' }}
                onClick={(e) => setCurrentTab(0)}
              >
                <Map></Map>
              </IconButton>
            </Tooltip>
          </AvatarGroup>
        }
      />
      <Box sx={{ overflow: "hidden", borderRadius: '10px', margin: '8px', display: currentTab === 0 ? 'block' : 'none' }}>
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <Stack direction="row">
            <InputLabel id="demo-simple-select-label">Encounter Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={encounterType}
              label="Encounter Type"
              fullWidth
              sx={{ marginRight: 1 }}
              onChange={(e) => setEncounterType(e.target.value)}
            >
              {encounterTypes.map((et) => {
                return (
                  <MenuItem value={et.key}>{et.label}</MenuItem>
                )
              })}
            </Select>
            <Button disabled={!encounterType} onClick={handleGenerateRandomEncounters} variant="outlined">
              Generate
            </Button>
          </Stack>
        </FormControl>
        {randomEncounters.map((e) => {
          return (
            <Paper sx={{ padding: 1, margin: 1, fontSize: 21, fontWeight: 500}}>
              {e}
            </Paper>
          )
        })}
      </Box>
    </Stack >
  );
}
