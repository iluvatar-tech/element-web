/*
Copyright 2024 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React, { type JSX } from "react";

import { _t } from "../../../languageHandler.tsx";

interface WorkspacePanelProps {
    roomId: string;
}

export default function WorkspacePanel({ roomId }: WorkspacePanelProps): JSX.Element {
    return (
        <div className="mx_WorkspacePanel">
            <div className="mx_WorkspacePanel_header">
                <h3 className="mx_WorkspacePanel_title">
                    Workspace
                </h3>
            </div>
            <div className="mx_WorkspacePanel_content">
                <textarea
                    className="mx_WorkspacePanel_textarea"
                    placeholder="Take notes or plan your work..."
                    aria-label="Workspace notes"
                />
            </div>
        </div>
    );
}