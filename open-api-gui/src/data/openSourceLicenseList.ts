import OpenApi from "../../@types/OpenApiTypes";

// List of popular licenses from the Open Source Initiative (https://opensource.org/licenses)
export const openSourceLicenseList: OpenApi.LicenseObject[] = [
  {
    name: "Apache License 2.0",
    url: "https://opensource.org/licenses/Apache-2.0",
  },
  {
    name: 'BSD 3-Clause "New" or "Revised" license',
    url: "https://opensource.org/licenses/BSD-3-Clause",
  },
  {
    name: 'BSD 2-Clause "Simplified" or "FreeBSD" license',
    url: "https://opensource.org/licenses/BSD-2-Clause",
  },
  {
    name: "GNU General Public License (GPL)",
    url: "https://opensource.org/licenses/gpl-license",
  },
  {
    name: 'GNU Library or "Lesser" General Public License (LGPL)',
    url: "https://opensource.org/licenses/lgpl-license",
  },
  { name: "MIT license", url: "https://opensource.org/licenses/MIT" },
  {
    name: "Mozilla Public License 2.0",
    url: "https://opensource.org/licenses/MPL-2.0",
  },
  {
    name: "Common Development and Distribution License",
    url: "https://opensource.org/licenses/CDDL-1.0",
  },
  {
    name: "Eclipse Public License version 2.0",
    url: "https://opensource.org/licenses/EPL-2.0",
  },
];
