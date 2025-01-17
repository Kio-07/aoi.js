module.exports = async d => {
    const {code} = d.command;
    const inside = d.unpack();
    const err = d.inside(inside);
    if (err) return d.error(err);

    let [channelID, message, returnId = "no"] = inside.splits;

    const channel = await d.util.getChannel(d, channelID);
    if (!channel) return d.aoiError.fnError(d, "channel", {inside});

    message = await d.util.errorParser(message, d);

    const msg = await d.aoiError.makeMessageError(d.client, channel, message.data ?? message, message.options, d);


    const result = (returnId === "yes" ? msg?.id : "") || "";

    return {
        code: d.util.setCode({function: d.func, code, inside, result})
    }
}