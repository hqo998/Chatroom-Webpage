#include <iostream>
#include <nlohmann/json.hpp>
#include "webview/webview.h"

#include <fstream>
#include <sstream>
#include <chrono>

using json = nlohmann::json;

void printTickerVal(webview::webview& window)
{
    std::this_thread::sleep_for(std::chrono::seconds(5));

    window.dispatch([&window]() {
        window.set_title("Booger");
    });
}

// #ifdef _WIN32
// int WINAPI WinMain(HINSTANCE /*hInst*/, HINSTANCE /*hPrevInst*/,
//                    LPSTR /*lpCmdLine*/, int /*nCmdShow*/) {
// #else
int main() {
    // #endif
    std::ifstream inHTML{"ui/index.html"};

    if (!inHTML) {
        std::cerr << "Failed to open HTML \n";
        return -1;
    }

    std::stringstream buffer;
    buffer << inHTML.rdbuf();

    try {
        webview::webview main_window(false, nullptr);
        main_window.set_title("Prompt Workbench");
        main_window.set_size(1280, 720, WEBVIEW_HINT_NONE);

        main_window.bind("ping", [&](const std::string& args_str) -> std::string {
            json args = json::parse(args_str);

            std::cout << "Ping from UI: " << args[0] << std::endl;

            json result = {{"code", 200}};
            return result.dump();
        });

        main_window.set_html(buffer.str());

        std::thread ticker(printTickerVal, std::ref(main_window));

        ticker.detach();

        main_window.run();

    } catch (const webview::exception &e) {
        std::cerr << e.what() << '\n';
        return 1;
    }

    return 0;
}
