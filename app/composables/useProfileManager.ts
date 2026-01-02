import { ref, watch } from "vue";
import balancedProfile from "../data/profiles/balanced.json";
import communityProfile from "../data/profiles/community.json";
import defaultProfile from "../data/profiles/default.json";
import secureProfile from "../data/profiles/secure.json";

export const useProfileManager = () => {
  const profiles: Record<string, any> = {
    Balanced: balancedProfile,
    Secure: secureProfile,
    Community: communityProfile,
    Default: defaultProfile,
  };

  const config = ref({ ...defaultProfile.config });
  const currentProfile = ref("Default");
  const isCustomConfig = ref(false);

  watch(
    config,
    (newConfig) => {
      let matchesProfile = false;
      for (const [profileName, profile] of Object.entries(profiles)) {
        const profileConfig = profile.config;
        const matches = Object.keys(profileConfig).every((key) => {
          if (key === "MappedFolders" || key === "LogonCommand") {
            return true;
          }
          const profileValue =
            profileConfig[key] === "Enable"
              ? true
              : profileConfig[key] === "Disable"
              ? false
              : profileConfig[key];
          return profileValue === newConfig[key];
        });
        if (matches) {
          matchesProfile = true;
          currentProfile.value = profileName;
          isCustomConfig.value = false;
          break;
        }
      }

      if (!matchesProfile) {
        isCustomConfig.value = true;
      }
    },
    { deep: true }
  );

  const checkForCustomConfig = () => {
    config.value = { ...config.value };
  };

  const loadProfile = (profileName: string) => {
    const profile = profiles[profileName];
    if (profile) {
      currentProfile.value = profileName;
      isCustomConfig.value = false;
      const profileConfig = { ...profile.config };
      for (const [key, value] of Object.entries(profileConfig)) {
        if (value === "Enable") {
          profileConfig[key] = true;
        } else if (value === "Disable") {
          profileConfig[key] = false;
        }
      }
      config.value = profileConfig;
    }
  };

  loadProfile("Default");

  return {
    profiles,
    config,
    currentProfile,
    isCustomConfig,
    loadProfile,
    checkForCustomConfig,
  };
};
