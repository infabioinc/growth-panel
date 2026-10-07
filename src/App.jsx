import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import HomePage from './pages/Home/HomePage';
import IpltechDashboardPage from './pages/ipltech/DashboardPage';
import IpltechObjectivesPage from './pages/ipltech/ObjectivesPage';
import IpltechInitiativesPage from './pages/ipltech/InitiativesPage';
import IpltechExperimentsPage from './pages/ipltech/ExperimentsPage';
import PunoDashboardPage from './pages/puno/DashboardPage';
import PunoObjectivesPage from './pages/puno/ObjectivesPage';
import PunoInitiativesPage from './pages/puno/InitiativesPage';
import PunoExperimentsPage from './pages/puno/ExperimentsPage';
import MontraDashboardPage from './pages/montra/DashboardPage';
import MontraObjectivesPage from './pages/montra/ObjectivesPage';
import MontraInitiativesPage from './pages/montra/InitiativesPage';
import MontraExperimentsPage from './pages/montra/ExperimentsPage';
import SanyDashboardPage from './pages/sany/DashboardPage';
import SanyObjectivesPage from './pages/sany/ObjectivesPage';
import SanyInitiativesPage from './pages/sany/InitiativesPage';
import SanyExperimentsPage from './pages/sany/ExperimentsPage';
import HeadsUpB2bDashboardPage from './pages/HeadsUpB2b/DashboardPage';
import HeadsUpB2bObjectivesPage from './pages/HeadsUpB2b/ObjectivesPage';
import HeadsUpB2bInitiativesPage from './pages/HeadsUpB2b/InitiativesPage';
import HeadsUpB2bExperimentsPage from './pages/HeadsUpB2b/ExperimentsPage';
import TailworldDashboardPage from './pages/Tailworld/DashboardPage';
import TailworldObjectivesPage from './pages/Tailworld/ObjectivesPage';
import TailworldInitiativesPage from './pages/Tailworld/InitiativesPage';
import TailworldExperimentsPage from './pages/Tailworld/ExperimentsPage';
import BlueEnergyMotorsDashboardPage from './pages/BlueEnergyMotors/DashboardPage';
import BlueEnergyMotorsObjectivesPage from './pages/BlueEnergyMotors/ObjectivesPage';
import BlueEnergyMotorsInitiativesPage from './pages/BlueEnergyMotors/InitiativesPage';
import BlueEnergyMotorsExperimentsPage from './pages/BlueEnergyMotors/ExperimentsPage';
import InstaGroupDashboardPage from './pages/InstaGroup/DashboardPage';
import InstaGroupObjectivesPage from './pages/InstaGroup/ObjectivesPage';
import InstaGroupInitiativesPage from './pages/InstaGroup/InitiativesPage';
import InstaGroupExperimentsPage from './pages/InstaGroup/ExperimentsPage';
import VZYTvDashboardPage from './pages/VZYTv/DashboardPage';
import VZYTvObjectivesPage from './pages/VZYTv/ObjectivesPage';
import VZYTvInitiativesPage from './pages/VZYTv/InitiativesPage';
import VZYTvExperimentsPage from './pages/VZYTv/ExperimentsPage';
import McRAYGORDashboardPage from './pages/McRAYGOR/DashboardPage';
import McRAYGORObjectivesPage from './pages/McRAYGOR/ObjectivesPage';
import McRAYGORInitiativesPage from './pages/McRAYGOR/InitiativesPage';
import McRAYGORExperimentsPage from './pages/McRAYGOR/ExperimentsPage';
import MovoDreamDashboardPage from './pages/MovoDream/DashboardPage';
import MovoDreamObjectivesPage from './pages/MovoDream/ObjectivesPage';
import MovoDreamInitiativesPage from './pages/MovoDream/InitiativesPage';
import MovoDreamExperimentsPage from './pages/MovoDream/ExperimentsPage';
import A2BilonaGheeDashboardPage from './pages/A2BilonaGhee/DashboardPage';
import A2BilonaGheeObjectivesPage from './pages/A2BilonaGhee/ObjectivesPage';
import A2BilonaGheeInitiativesPage from './pages/A2BilonaGhee/InitiativesPage';
import A2BilonaGheeExperimentsPage from './pages/A2BilonaGhee/ExperimentsPage';
import YastudyDashboardPage from './pages/yastudy/DashboardPage';
import YastudyObjectivesPage from './pages/yastudy/ObjectivesPage';
import YastudyInitiativesPage from './pages/yastudy/InitiativesPage';
import YastudyExperimentsPage from './pages/yastudy/ExperimentsPage';
import KaizenDashboardPage from './pages/kaizen/DashboardPage';
import KaizenObjectivesPage from './pages/kaizen/ObjectivesPage';
import KaizenInitiativesPage from './pages/kaizen/InitiativesPage';
import KaizenExperimentsPage from './pages/kaizen/ExperimentsPage';
import SidRealTechDashboardPage from './pages/sidrealtech/DashboardPage';
import SidRealTechObjectivesPage from './pages/sidrealtech/ObjectivesPage';
import SidRealTechInitiativesPage from './pages/sidrealtech/InitiativesPage';
import SidRealTechExperimentsPage from './pages/sidrealtech/ExperimentsPage';
import MindDharaDashboardPage from './pages/MindDhara/DashboardPage';
import MindDharaObjectivesPage from './pages/MindDhara/ObjectivesPage';
import MindDharaInitiativesPage from './pages/MindDhara/InitiativesPage';
import MindDharaExperimentsPage from './pages/MindDhara/ExperimentsPage';
import MysteryRoomsDashboardPage from './pages/MysteryRooms/DashboardPage';
import MysteryRoomsObjectivesPage from './pages/MysteryRooms/ObjectivesPage';
import MysteryRoomsInitiativesPage from './pages/MysteryRooms/InitiativesPage';
import MysteryRoomsExperimentsPage from './pages/MysteryRooms/ExperimentsPage';
import RiaGuptaDashboardPage from './pages/RiaGupta/DashboardPage';
import RiaGuptaObjectivesPage from './pages/RiaGupta/ObjectivesPage';
import RiaGuptaInitiativesPage from './pages/RiaGupta/InitiativesPage';
import RiaGuptaExperimentsPage from './pages/RiaGupta/ExperimentsPage';
import OxxyDashboardPage from './pages/Oxxy/DashboardPage';
import OxxyObjectivesPage from './pages/Oxxy/ObjectivesPage';
import OxxyInitiativesPage from './pages/Oxxy/InitiativesPage';
import OxxyExperimentsPage from './pages/Oxxy/ExperimentsPage';
import LetsAskDoctorDashboardPage from './pages/LetsAskDoctor/DashboardPage';
import LetsAskDoctorObjectivesPage from './pages/LetsAskDoctor/ObjectivesPage';
import LetsAskDoctorInitiativesPage from './pages/LetsAskDoctor/InitiativesPage';
import LetsAskDoctorExperimentsPage from './pages/LetsAskDoctor/ExperimentsPage';
import AfiwayDashboardPage from './pages/Afiway/DashboardPage';
import AfiwayObjectivesPage from './pages/Afiway/ObjectivesPage';
import AfiwayInitiativesPage from './pages/Afiway/InitiativesPage';
import AfiwayExperimentsPage from './pages/Afiway/ExperimentsPage';
import AapnoGharDashboardPage from './pages/AapnoGhar/DashboardPage';
import AapnoGharObjectivesPage from './pages/AapnoGhar/ObjectivesPage';
import AapnoGharInitiativesPage from './pages/AapnoGhar/InitiativesPage';
import AapnoGharExperimentsPage from './pages/AapnoGhar/ExperimentsPage';
import IconsBaseDashboardPage from './pages/iconsbase/DashboardPage';
import IconsBaseObjectivesPage from './pages/iconsbase/ObjectivesPage';
import IconsBaseInitiativesPage from './pages/iconsbase/InitiativesPage';
import IconsBaseExperimentsPage from './pages/iconsbase/ExperimentsPage';
import MciDashboardPage from './pages/Mci/DashboardPage';
import MciObjectivesPage from './pages/Mci/ObjectivesPage';
import MciInitiativesPage from './pages/Mci/InitiativesPage';
import MciExperimentsPage from './pages/Mci/ExperimentsPage';
import TraveBeezDashboardPage from './pages/TraveBeez/DashboardPage';
import TraveBeezObjectivesPage from './pages/TraveBeez/ObjectivesPage';
import TraveBeezInitiativesPage from './pages/TraveBeez/InitiativesPage';
import TraveBeezExperimentsPage from './pages/TraveBeez/ExperimentsPage';
import TallentoDashboardPage from './pages/Tallento/DashboardPage';
import TallentoObjectivesPage from './pages/Tallento/ObjectivesPage';
import TallentoInitiativesPage from './pages/Tallento/InitiativesPage';
import TallentoExperimentsPage from './pages/Tallento/ExperimentsPage';
import BoxOfficeDashboardPage from './pages/BoxOffice/DashboardPage';
import BoxOfficeObjectivesPage from './pages/BoxOffice/ObjectivesPage';
import BoxOfficeInitiativesPage from './pages/BoxOffice/InitiativesPage';
import BoxOfficeExperimentsPage from './pages/BoxOffice/ExperimentsPage';
import DeepHorizonDashboardPage from './pages/DeepHorizon/DashboardPage';
import DeepHorizonObjectivesPage from './pages/DeepHorizon/ObjectivesPage';
import DeepHorizonInitiativesPage from './pages/DeepHorizon/InitiativesPage';
import DeepHorizonExperimentsPage from './pages/DeepHorizon/ExperimentsPage';
import BonFitDashboardPage from './pages/BonFit/DashboardPage';
import BonFitObjectivesPage from './pages/BonFit/ObjectivesPage';
import BonFitInitiativesPage from './pages/BonFit/InitiativesPage';
import BonFitExperimentsPage from './pages/BonFit/ExperimentsPage';
import WrtsGymDashboardPage from './pages/WrtsGym/DashboardPage';
import WrtsGymObjectivesPage from './pages/WrtsGym/ObjectivesPage';
import WrtsGymInitiativesPage from './pages/WrtsGym/InitiativesPage';
import WrtsGymExperimentsPage from './pages/WrtsGym/ExperimentsPage';
import StepAheadDashboardPage from './pages/StepAhead/DashboardPage';
import StepAheadObjectivesPage from './pages/StepAhead/ObjectivesPage';
import StepAheadInitiativesPage from './pages/StepAhead/InitiativesPage';
import StepAheadExperimentsPage from './pages/StepAhead/ExperimentsPage';
import WorkwearExpressDashboardPage from './pages/WorkwearExpress/DashboardPage';
import WorkwearExpressObjectivesPage from './pages/WorkwearExpress/ObjectivesPage';
import WorkwearExpressInitiativesPage from './pages/WorkwearExpress/InitiativesPage';
import WorkwearExpressExperimentsPage from './pages/WorkwearExpress/ExperimentsPage';
import BatterySmartDashboardPage from './pages/BatterySmart/DashboardPage';
import BatterySmartObjectivesPage from './pages/BatterySmart/ObjectivesPage';
import BatterySmartInitiativesPage from './pages/BatterySmart/InitiativesPage';
import BatterySmartExperimentsPage from './pages/BatterySmart/ExperimentsPage';

import FabulousMediaDashboardPage from './pages/FabulousMedia/DashboardPage';
import FabulousMediaObjectivesPage from './pages/FabulousMedia/ObjectivesPage';
import FabulousMediaInitiativesPage from './pages/FabulousMedia/InitiativesPage';
import FabulousMediaExperimentsPage from './pages/FabulousMedia/ExperimentsPage';

import MadhavSolarDashboardPage from './pages/MadhavSolar/DashboardPage';
import MadhavSolarObjectivesPage from './pages/MadhavSolar/ObjectivesPage';
import MadhavSolarInitiativesPage from './pages/MadhavSolar/InitiativesPage';
import MadhavSolarExperimentsPage from './pages/MadhavSolar/ExperimentsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route
        path="/ipltech/dashboard"
        element={<IpltechDashboardPage />}
      />
      <Route
        path="/ipltech/objectives"
        element={<IpltechObjectivesPage />}
      />
      <Route
        path="/ipltech/initiatives"
        element={<IpltechInitiativesPage />}
      />
      <Route
        path="/ipltech/experiments"
        element={<IpltechExperimentsPage />}
      />
      <Route
        path="/puno/dashboard"
        element={<PunoDashboardPage />}
      />
      <Route
        path="/puno/objectives"
        element={<PunoObjectivesPage />}
      />
      <Route
        path="/puno/initiatives"
        element={<PunoInitiativesPage />}
      />
      <Route
        path="/puno/experiments"
        element={<PunoExperimentsPage />}
      />
      <Route
        path="/montra/dashboard"
        element={<MontraDashboardPage />}
      />
      <Route
        path="/montra/objectives"
        element={<MontraObjectivesPage />}
      />
      <Route
        path="/montra/initiatives"
        element={<MontraInitiativesPage />}
      />
      <Route
        path="/montra/experiments"
        element={<MontraExperimentsPage />}
      />
      <Route
        path="/sany/dashboard"
        element={<SanyDashboardPage />}
      />
      <Route
        path="/sany/objectives"
        element={<SanyObjectivesPage />}
      />
      <Route
        path="/sany/initiatives"
        element={<SanyInitiativesPage />}
      />
      <Route
        path="/sany/experiments"
        element={<SanyExperimentsPage />}
      />
      <Route
        path="/headsupb2b/dashboard"
        element={<HeadsUpB2bDashboardPage />}
      />
      <Route
        path="/headsupb2b/objectives"
        element={<HeadsUpB2bObjectivesPage />}
      />
      <Route
        path="/headsupb2b/initiatives"
        element={<HeadsUpB2bInitiativesPage />}
      />
      <Route
        path="/headsupb2b/experiments"
        element={<HeadsUpB2bExperimentsPage />}
      />
      <Route
        path="/tailworld/dashboard"
        element={<TailworldDashboardPage />}
      />
      <Route
        path="/tailworld/objectives"
        element={<TailworldObjectivesPage />}
      />
      <Route
        path="/tailworld/initiatives"
        element={<TailworldInitiativesPage />}
      />
      <Route
        path="/tailworld/experiments"
        element={<TailworldExperimentsPage />}
      />
      <Route
        path="/blueenergymotors/dashboard"
        element={<BlueEnergyMotorsDashboardPage />}
      />
      <Route
        path="/blueenergymotors/objectives"
        element={<BlueEnergyMotorsObjectivesPage />}
      />
      <Route
        path="/blueenergymotors/initiatives"
        element={<BlueEnergyMotorsInitiativesPage />}
      />
      <Route
        path="/blueenergymotors/experiments"
        element={<BlueEnergyMotorsExperimentsPage />}
      />
      <Route
        path="/instagroup/dashboard"
        element={<InstaGroupDashboardPage />}
      />
      <Route
        path="/instagroup/objectives"
        element={<InstaGroupObjectivesPage />}
      />
      <Route
        path="/instagroup/initiatives"
        element={<InstaGroupInitiativesPage />}
      />
      <Route
        path="/instagroup/experiments"
        element={<InstaGroupExperimentsPage />}
      />
      <Route
        path="/vzytv/dashboard"
        element={<VZYTvDashboardPage />}
      />
      <Route
        path="/vzytv/objectives"
        element={<VZYTvObjectivesPage />}
      />
      <Route
        path="/vzytv/initiatives"
        element={<VZYTvInitiativesPage />}
      />
      <Route
        path="/vzytv/experiments"
        element={<VZYTvExperimentsPage />}
      />
      <Route
        path="/mcraygor/dashboard"
        element={<McRAYGORDashboardPage />}
      />
      <Route
        path="/mcraygor/objectives"
        element={<McRAYGORObjectivesPage />}
      />
      <Route
        path="/mcraygor/initiatives"
        element={<McRAYGORInitiativesPage />}
      />
      <Route
        path="/mcraygor/experiments"
        element={<McRAYGORExperimentsPage />}
      />
      <Route
        path="/movodream/dashboard"
        element={<MovoDreamDashboardPage />}
      />
      <Route
        path="/movodream/objectives"
        element={<MovoDreamObjectivesPage />}
      />
      <Route
        path="/movodream/initiatives"
        element={<MovoDreamInitiativesPage />}
      />
      <Route
        path="/movodream/experiments"
        element={<MovoDreamExperimentsPage />}
      />
      <Route
        path="/a2bilonaghee/dashboard"
        element={<A2BilonaGheeDashboardPage />}
      />
      <Route
        path="/a2bilonaghee/objectives"
        element={<A2BilonaGheeObjectivesPage />}
      />
      <Route
        path="/a2bilonaghee/initiatives"
        element={<A2BilonaGheeInitiativesPage />}
      />
      <Route
        path="/a2bilonaghee/experiments"
        element={<A2BilonaGheeExperimentsPage />}
      />
      <Route
        path="/yastudy/dashboard"
        element={<YastudyDashboardPage />}
      />
      <Route
        path="/yastudy/objectives"
        element={<YastudyObjectivesPage />}
      />
      <Route
        path="/yastudy/initiatives"
        element={<YastudyInitiativesPage />}
      />
      <Route
        path="/yastudy/experiments"
        element={<YastudyExperimentsPage />}
      />
      <Route
        path="/kaizen/dashboard"
        element={<KaizenDashboardPage />}
      />
      <Route
        path="/kaizen/objectives"
        element={<KaizenObjectivesPage />}
      />
      <Route
        path="/kaizen/initiatives"
        element={<KaizenInitiativesPage />}
      />
      <Route
        path="/kaizen/experiments"
        element={<KaizenExperimentsPage />}
      />
      <Route
        path="/sidrealtech/dashboard"
        element={<SidRealTechDashboardPage />}
      />
      <Route
        path="/sidrealtech/objectives"
        element={<SidRealTechObjectivesPage />}
      />
      <Route
        path="/sidrealtech/initiatives"
        element={<SidRealTechInitiativesPage />}
      />
      <Route
        path="/sidrealtech/experiments"
        element={<SidRealTechExperimentsPage />}
      />
      <Route
        path="/minddhara/dashboard"
        element={<MindDharaDashboardPage />}
      />
      <Route
        path="/minddhara/objectives"
        element={<MindDharaObjectivesPage />}
      />
      <Route
        path="/minddhara/initiatives"
        element={<MindDharaInitiativesPage />}
      />
      <Route
        path="/minddhara/experiments"
        element={<MindDharaExperimentsPage />}
      />
      <Route
        path="/mysteryrooms/dashboard"
        element={<MysteryRoomsDashboardPage />}
      />
      <Route
        path="/mysteryrooms/objectives"
        element={<MysteryRoomsObjectivesPage />}
      />
      <Route
        path="/mysteryrooms/initiatives"
        element={<MysteryRoomsInitiativesPage />}
      />
      <Route
        path="/mysteryrooms/experiments"
        element={<MysteryRoomsExperimentsPage />}
      />
      <Route
        path="/riagupta/dashboard"
        element={<RiaGuptaDashboardPage />}
      />
      <Route
        path="/riagupta/objectives"
        element={<RiaGuptaObjectivesPage />}
      />
      <Route
        path="/riagupta/initiatives"
        element={<RiaGuptaInitiativesPage />}
      />
      <Route
        path="/riagupta/experiments"
        element={<RiaGuptaExperimentsPage />}
      />
      <Route
        path="/oxxy/dashboard"
        element={<OxxyDashboardPage />}
      />
      <Route
        path="/oxxy/objectives"
        element={<OxxyObjectivesPage />}
      />
      <Route
        path="/oxxy/initiatives"
        element={<OxxyInitiativesPage />}
      />
      <Route
        path="/oxxy/experiments"
        element={<OxxyExperimentsPage />}
      />
      <Route
        path="/letsaskdoctor/dashboard"
        element={<LetsAskDoctorDashboardPage />}
      />
      <Route
        path="/letsaskdoctor/objectives"
        element={<LetsAskDoctorObjectivesPage />}
      />
      <Route
        path="/letsaskdoctor/initiatives"
        element={<LetsAskDoctorInitiativesPage />}
      />
      <Route
        path="/letsaskdoctor/experiments"
        element={<LetsAskDoctorExperimentsPage />}
      />
      <Route
        path="/afiway/dashboard"
        element={<AfiwayDashboardPage />}
      />
      <Route
        path="/afiway/objectives"
        element={<AfiwayObjectivesPage />}
      />
      <Route
        path="/afiway/initiatives"
        element={<AfiwayInitiativesPage />}
      />
      <Route
        path="/afiway/experiments"
        element={<AfiwayExperimentsPage />}
      />
      <Route
        path="/aapnoghar/dashboard"
        element={<AapnoGharDashboardPage />}
      />
      <Route
        path="/aapnoghar/objectives"
        element={<AapnoGharObjectivesPage />}
      />
      <Route
        path="/aapnoghar/initiatives"
        element={<AapnoGharInitiativesPage />}
      />
      <Route
        path="/aapnoghar/experiments"
        element={<AapnoGharExperimentsPage />}
      />
      <Route
        path="/iconsbase/dashboard"
        element={<IconsBaseDashboardPage />}
      />
      <Route
        path="/iconsbase/objectives"
        element={<IconsBaseObjectivesPage />}
      />
      <Route
        path="/iconsbase/initiatives"
        element={<IconsBaseInitiativesPage />}
      />
      <Route
        path="/iconsbase/experiments"
        element={<IconsBaseExperimentsPage />}
      />
      <Route
        path="/mci/dashboard"
        element={<MciDashboardPage />}
      />
      <Route
        path="/mci/objectives"
        element={<MciObjectivesPage />}
      />
      <Route
        path="/mci/initiatives"
        element={<MciInitiativesPage />}
      />
      <Route
        path="/mci/experiments"
        element={<MciExperimentsPage />}
      />
      <Route
        path="/travebeez/dashboard"
        element={<TraveBeezDashboardPage />}
      />
      <Route
        path="/travebeez/objectives"
        element={<TraveBeezObjectivesPage />}
      />
      <Route
        path="/travebeez/initiatives"
        element={<TraveBeezInitiativesPage />}
      />
      <Route
        path="/travebeez/experiments"
        element={<TraveBeezExperimentsPage />}
      />
      <Route
        path="/tallento/dashboard"
        element={<TallentoDashboardPage />}
      />
      <Route
        path="/tallento/objectives"
        element={<TallentoObjectivesPage />}
      />
      <Route
        path="/tallento/initiatives"
        element={<TallentoInitiativesPage />}
      />
      <Route
        path="/tallento/experiments"
        element={<TallentoExperimentsPage />}
      />
      <Route
        path="/boxoffice/dashboard"
        element={<BoxOfficeDashboardPage />}
      />
      <Route
        path="/boxoffice/objectives"
        element={<BoxOfficeObjectivesPage />}
      />
      <Route
        path="/boxoffice/initiatives"
        element={<BoxOfficeInitiativesPage />}
      />
      <Route
        path="/boxoffice/experiments"
        element={<BoxOfficeExperimentsPage />}
      />
      <Route
        path="/deephorizon/dashboard"
        element={<DeepHorizonDashboardPage />}
      />
      <Route
        path="/deephorizon/objectives"
        element={<DeepHorizonObjectivesPage />}
      />
      <Route
        path="/deephorizon/initiatives"
        element={<DeepHorizonInitiativesPage />}
      />
      <Route
        path="/deephorizon/experiments"
        element={<DeepHorizonExperimentsPage />}
      />
      <Route
        path="/bonfit/dashboard"
        element={<BonFitDashboardPage />}
      />
      <Route
        path="/bonfit/objectives"
        element={<BonFitObjectivesPage />}
      />
      <Route
        path="/bonfit/initiatives"
        element={<BonFitInitiativesPage />}
      />
      <Route
        path="/bonfit/experiments"
        element={<BonFitExperimentsPage />}
      />
      <Route
        path="/wrtsgym/dashboard"
        element={<WrtsGymDashboardPage />}
      />
      <Route
        path="/wrtsgym/objectives"
        element={<WrtsGymObjectivesPage />}
      />
      <Route
        path="/wrtsgym/initiatives"
        element={<WrtsGymInitiativesPage />}
      />
      <Route
        path="/wrtsgym/experiments"
        element={<WrtsGymExperimentsPage />}
      />
      <Route
        path="/stepahead/dashboard"
        element={<StepAheadDashboardPage />}
      />
      <Route
        path="/stepahead/objectives"
        element={<StepAheadObjectivesPage />}
      />
      <Route
        path="/stepahead/initiatives"
        element={<StepAheadInitiativesPage />}
      />
      <Route
        path="/stepahead/experiments"
        element={<StepAheadExperimentsPage />}
      />
      <Route
        path="/workwearexpress/dashboard"
        element={<WorkwearExpressDashboardPage />}
      />
      <Route
        path="/workwearexpress/objectives"
        element={<WorkwearExpressObjectivesPage />}
      />
      <Route
        path="/workwearexpress/initiatives"
        element={<WorkwearExpressInitiativesPage />}
      />
      <Route
        path="/workwearexpress/experiments"
        element={<WorkwearExpressExperimentsPage />}
      />
      <Route
        path="/batterysmart/dashboard"
        element={<BatterySmartDashboardPage />}
      />
      <Route
        path="/batterysmart/objectives"
        element={<BatterySmartObjectivesPage />}
      />
      <Route
        path="/batterysmart/initiatives"
        element={<BatterySmartInitiativesPage />}
      />
      <Route
        path="/batterysmart/experiments"
        element={<BatterySmartExperimentsPage />}
      />
      <Route path="/fabulousmedia/dashboard" element={<FabulousMediaDashboardPage />} />
      <Route path="/fabulousmedia/objectives" element={<FabulousMediaObjectivesPage />} />
      <Route path="/fabulousmedia/initiatives" element={<FabulousMediaInitiativesPage />} />
      <Route path="/fabulousmedia/experiments" element={<FabulousMediaExperimentsPage />} />

      <Route path="/madhavsolar/dashboard" element={<MadhavSolarDashboardPage />} />
      <Route path="/madhavsolar/objectives" element={<MadhavSolarObjectivesPage />} />
      <Route path="/madhavsolar/initiatives" element={<MadhavSolarInitiativesPage />} />
      <Route path="/madhavsolar/experiments" element={<MadhavSolarExperimentsPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

