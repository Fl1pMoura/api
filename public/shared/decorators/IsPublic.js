"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPublicKey = void 0;
exports.IsPublic = IsPublic;
const common_1 = require("@nestjs/common");
exports.IsPublicKey = "IsPublic";
function IsPublic() {
    return (0, common_1.SetMetadata)(exports.IsPublicKey, true);
}
//# sourceMappingURL=IsPublic.js.map