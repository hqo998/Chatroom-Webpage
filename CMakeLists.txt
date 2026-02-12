cmake_minimum_required(VERSION 3.16)
project(app LANGUAGES CXX)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(WEBVIEW_WEBKITGTK_API 6.0)	

include(FetchContent)

FetchContent_Declare(
    webview
    GIT_REPOSITORY https://github.com/webview/webview
    GIT_TAG 0.12.0
)
FetchContent_MakeAvailable(webview)

FetchContent_Declare(
  json
  GIT_REPOSITORY https://github.com/nlohmann/json 
  GIT_TAG v3.12.0
)
FetchContent_MakeAvailable(json)

add_executable(app)

target_sources(app PRIVATE src/main.cpp) # ui/dist/index_html.h
target_include_directories(app PRIVATE ui/dist)
target_link_libraries(app PRIVATE webview::core nlohmann_json::nlohmann_json)


#copy index.html
set(RESOURCES_PATH ${CMAKE_SOURCE_DIR}/ui/dist)
add_custom_command(
    TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${RESOURCES_PATH} $<TARGET_FILE_DIR:${PROJECT_NAME}>/ui
)

# Hide the console window on Windows for Release builds
if(WIN32)
    set_target_properties(${PROJECT_NAME} PROPERTIES
        WIN32_EXECUTABLE $<OR:$<CONFIG:Release>,$<CONFIG:MinSizeRel>>
    )

    if(MSVC)
        # This allows use of 'int main()' instead of 'WinMain' for consistency.
        target_link_options(${PROJECT_NAME} PRIVATE
            "$<$<AND:$<PLATFORM_ID:Windows>,$<OR:$<CONFIG:Release>,$<CONFIG:MinSizeRel>>>:/ENTRY:mainCRTStartup>"
        )
    endif()
endif()
